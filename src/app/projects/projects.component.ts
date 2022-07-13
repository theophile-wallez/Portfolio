import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

export interface Project {
  title: string;
  description: string;
  techs: string[];
  imgSrc: string;
  sourceCodeLink: string;
  projectLink?: string;
}

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor() {}
  gitHubLink: string = 'https://github.com/theophile-wallez/';
  projects: Project[] = [];
  ngOnInit(): void {
    this.getProjectData();
    AOS.init();
  }

  async getProjectData() {
    let response: Response = await fetch('../../assets/datas/projects.json');
    this.projects = await response.json();
  }

  openLink(url: string) {
    window.open(url, '_blank')?.focus();
  }
}
