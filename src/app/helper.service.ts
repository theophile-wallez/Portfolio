import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  scrollTo(elementName?: string): void {
    let yScroll: number = 0;
    if (elementName) {
      let element: HTMLElement | null = document.getElementById(elementName);
      if (!element) return;
      yScroll = element.getBoundingClientRect().top + window.scrollY - 95;
    }

    window.scroll({
      top: yScroll,
      behavior: 'smooth',
    });
  }
}
