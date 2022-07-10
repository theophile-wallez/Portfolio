import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  constructor() {}

  elementsToChange: any[] = [];
  ngAfterViewInit(): void {
    this.elementsToChange.push(document.getElementById('hero-content'));
    this.elementsToChange.push(document.getElementById('header-menu'));
    this.elementsToChange.push(document.body);
  }
  ngOnInit(): void {
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
  }

  onWindowScroll() {
    let afterScrollClass: string = 'after-scroll';
    let scroll: number = window.scrollY;
    if (scroll >= 50) {
      if (this.elementsToChange[0]?.classList.contains('after-scroll')) return;
      this.elementsToChange.forEach((element: HTMLElement) => {
        element?.classList.add(afterScrollClass);
      });
    } else {
      this.elementsToChange.forEach((element: HTMLElement) => {
        element?.classList.remove(afterScrollClass);
      });
    }
  }
}
