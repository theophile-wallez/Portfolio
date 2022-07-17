import { HelperService } from './../helper.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  constructor(private helperService: HelperService) {}

  ngOnInit(): void {}
  scrollToAboutSection() {
    this.helperService.scrollTo('about');
  }
}
