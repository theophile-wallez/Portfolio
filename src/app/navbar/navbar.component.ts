import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  scrollTo(elementName?: string) {
    let yScroll: number = 0;

    if (elementName) {
      console.log('elementName: ', elementName);
      let element: HTMLElement | null = document.getElementById(elementName);
      if (!element) return;
      yScroll = element.getBoundingClientRect().top + window.scrollY - 70;
      console.log(elementName, element.getBoundingClientRect().top);
    }

    window.scroll({
      top: yScroll,
      behavior: 'smooth',
    });
  }
}
