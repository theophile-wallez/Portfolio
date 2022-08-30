import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  constructor(
    @Inject(DOCUMENT) private _doc: Document,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  getWindow(): Window | null {
    return this._doc.defaultView;
  }

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getDocument(): Document {
    return this._doc;
  }

  getLocation(): Location {
    return this._doc.location;
  }

  createElement(tag: string): HTMLElement {
    return this._doc.createElement(tag);
  }
}
