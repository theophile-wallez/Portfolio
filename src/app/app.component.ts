import { WindowService } from './window.service';
import { Component, AfterViewInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements AfterViewInit {
  title = 'portfolio';
  isPageLoading: boolean = true;
  constructor(private windowService: WindowService) {}
  elementsToChange: any[] = [];
  ngAfterViewInit(): void {
    if (!this.windowService.isBrowser) return;
    window.addEventListener('scroll', this.noScroll);
    window.addEventListener('scroll', this.onWindowScroll.bind(this));
    this.elementsToChange.push(document.body);
    this.elementsToChange.push(document.getElementById('hero-content'));
    this.elementsToChange.push(document.getElementById('bg-color'));
    this.elementsToChange.push(document.getElementById('header-menu'));

    // Handles app loading
    window.scrollTo({ top: 0 });
    setTimeout(() => {
      document.getElementById('loader')?.classList.add('disappear');
      window?.removeEventListener('scroll', this.noScroll);
      setTimeout(() => {
        this.isPageLoading = false;
      }, 500);
    }, 1600);
  }

  ngOnDestroy() {
    if (!this.windowService.isBrowser) return;
    window.removeEventListener('scroll', this.noScroll);
    window.removeEventListener('scroll', this.onWindowScroll.bind(this));
  }

  noScroll() {
    window.scrollTo(0, 0);
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
