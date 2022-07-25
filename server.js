var express = require("express");
const nodemailer = require("nodemailer");

var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/portfolio";
app.use(express.static(distDir));

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

app.post("/sendmail", (req, res) => {
  let contactForm = req.body;
  sendMail(contactForm, (info) => {
    res.send(info);
  });
});

async function sendMail(contactForm, callback) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "theophile.wall@gmail.com",
      pass: "oxnbeencxsomcaqo",
    },
  });

  let mailOptions = {
    from: contactForm.email,
    to: "theophile.wall@gmail.com",
    subject: contactForm?.subject || "No subject specified",
    html: `
            <h2>Name: ${contactForm?.name || "Not specified"}</h2>
            <h2>From: ${contactForm.email}</h2><br>
            <p>${contactForm.message}</p>
        `,
  };

  let info = await transporter.sendMail(mailOptions);
  callback(info);
}

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist/portfolio/index.html"));
});
