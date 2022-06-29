import { Component, OnInit } from '@angular/core';

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

  projects: Project[] = [];
  ngOnInit(): void {
    this.getProjectData();
  }

  async getProjectData() {
    let response: Response = await fetch('../../assets/datas/projects.json');
    this.projects = await response.json();
  }

  openLink(url: string) {
    window.open(url, '_blank')?.focus();
  }
}
