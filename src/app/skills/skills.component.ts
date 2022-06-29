import { Component, OnInit } from '@angular/core';
declare var require: any;
const TagCloud = require('TagCloud');

@Component({
  selector: 'skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  constructor() {}

  skills: string[] = [
    'JavaScript',
    'Angular',
    'CSS',
    'SCSS',
    'HTML',
    'Java',
    'Spring Boot',
    'git',
    'SVN',
    'Node.js',
    'Express.js',
    'SQL',
    'Firebase',
  ];

  ngOnInit(): void {
    this.displaySkillsCloud();
  }

  displaySkillsCloud(): void {
    TagCloud('.skills-cloud', this.skills, {
      radius: 240,
      maxSpeed: 'normal',
      initSpeed: 'normal',
      direction: 135,
      keep: true,
    });
  }
}
