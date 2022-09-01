import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import * as nodemailer from 'nodemailer';
import * as bodyParser from 'body-parser';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/portfolio/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.post('/sendmail', (req, res) => {
    let contactForm = req.body;
    console.log('contactForm: ', contactForm);
    sendMail(contactForm, (info) => {
      res.send(info);
    });
  });

  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = 4000;

  // Start up the Node server
  const server = app();

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

async function sendMail(contactForm, callback) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'theophile.wall@gmail.com',
      pass: 'daoblgimyeddsecs',
    },
  });

  let mailOptions = {
    from: contactForm.email,
    to: 'theophile.wall@gmail.com',
    subject: contactForm?.subject || 'No subject specified',
    html: `
            <h2>Name: ${contactForm?.name || 'Not specified'}</h2>
            <h2>From: ${contactForm.email}</h2><br>
            <p>${contactForm.message}</p>
        `,
  };

  let info = await transporter.sendMail(mailOptions);
  callback(info);
}

declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
