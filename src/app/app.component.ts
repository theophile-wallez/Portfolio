import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  constructor() {}

  // heroBackground!: HTMLElement | null;
  // heroContent!: HTMLElement | null;
  // header!: HTMLElement | null;
  // backgroundText!: HTMLElement | null;

  elementsToChange: any[] = [];
  ngAfterViewInit(): void {
    this.elementsToChange.push(document.getElementById('hero-content'));
    this.elementsToChange.push(document.getElementById('header-menu'));
    this.elementsToChange.push(document.getElementById('background-text'));
    this.elementsToChange.push(document.getElementById('hero-full-width'));
    console.log('this.elementsToChange: ', this.elementsToChange);
  }
  ngOnInit(): void {
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
  }

  onWindowScroll() {
    let afterScrollClass: string = 'after-scroll';
    let scroll: number = window.scrollY;
    if (scroll >= 50) {
      this.elementsToChange.forEach((element) => {
        element?.classList.add(afterScrollClass);
      });
    } else {
      this.elementsToChange.forEach((element) => {
        element?.classList.remove(afterScrollClass);
      });
    }
  }
}
