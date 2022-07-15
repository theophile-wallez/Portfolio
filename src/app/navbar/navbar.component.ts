import { HelperService } from './../helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private helperService: HelperService) {}

  ngOnInit(): void {}

  scrollTo(elementName?: string) {
    this.helperService.scrollTo(elementName);
  }
}
