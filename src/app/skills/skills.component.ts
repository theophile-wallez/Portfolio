import { Component, OnInit } from '@angular/core';

export interface Skill {
  name: string;
  imgSource: string;
}
@Component({
  selector: 'skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  skillsIconsFolderPath: string = '/../../assets/img/skills/';
  skills: Skill[] = [];

  ngOnInit(): void {
    this.getSkills();
  }

  async getSkills() {
    let response: Response = await fetch('../../assets/datas/skills.json');
    this.skills = await response.json();
  }
}
