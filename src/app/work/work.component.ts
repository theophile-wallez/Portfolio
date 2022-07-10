import { Component, OnInit } from '@angular/core';

export interface Work {
  name: string;
  imageName: string;
  duration: number;
  description: string;
  link: string;
}

@Component({
  selector: 'work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit {
  constructor() {}
  imgFolderPath: string = '../../assets/img/work/';
  works: Work[] = [];

  ngOnInit(): void {
    this.getWorks();
  }

  async getWorks() {
    let response: Response = await fetch('../../assets/datas/works.json');
    this.works = await response.json();
  }

  openLink(url: string) {
    window.open(url, '_blank')?.focus();
  }
}
