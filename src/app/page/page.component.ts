import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    AOS.init();
  }
}
