import { HelperService } from './helper.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'portfolio';
  isPageLoading: boolean = true;
  constructor(private helperService: HelperService) {}

  elementsToChange: any[] = [];
  ngAfterViewInit(): void {
    this.elementsToChange.push(document.body);
    this.elementsToChange.push(document.getElementById('hero-content'));
    this.elementsToChange.push(document.getElementById('bg-color'));
    this.elementsToChange.push(document.getElementById('header-menu'));

    // Handles app loading
    window.scrollTo({ top: 0 });

    document.getElementById('loader')?.classList.add('disappear');
    setTimeout(() => {
      this.isPageLoading = false;
      document.getElementById('body')?.classList.remove('no-scroll');
    }, 500);
  }
  ngOnInit(): void {
    document.getElementById('body')?.classList.add('no-scroll');
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
