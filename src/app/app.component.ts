import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  constructor() {}

  heroBackground!: HTMLElement | null;
  heroContent!: HTMLElement | null;
  header!: HTMLElement | null;
  backgroundText!: HTMLElement | null;
  ngAfterViewInit(): void {
    this.heroBackground = document.getElementById('hero-full-width');
    this.heroContent = document.getElementById('hero-content');
    this.header = document.getElementById('header-menu');
    this.backgroundText = document.getElementById('background-text');
  }
  ngOnInit(): void {
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
  }
  onWindowScroll() {
    let newClass: string = 'after-scroll';
    let scroll: number = window.scrollY;
    if (scroll >= 50) {
      this.heroBackground?.classList.add(newClass);
      this.heroContent?.classList.add(newClass);
      this.header?.classList.add(newClass);
      this.backgroundText?.classList.add(newClass);
    } else {
      this.heroBackground?.classList.remove(newClass);
      this.heroContent?.classList.remove(newClass);
      this.header?.classList.remove(newClass);
      this.backgroundText?.classList.remove(newClass);
    }
  }
}
