import { Component, OnInit } from '@angular/core';

export interface WorkExperience {
  company: string;
  description: string;
}

@Component({
  selector: 'work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
})
export class WorkExperienceComponent implements OnInit {
  constructor() {}

  workExperiences: WorkExperience[] = [];
  selectedWork!: WorkExperience;
  ngOnInit(): void {
    this.getWorkExperience();
  }

  async getWorkExperience() {
    let response: Response = await fetch(
      '../../assets/datas/work-experience.json'
    );
    this.workExperiences = await response.json();
    this.selectedWork = this.workExperiences[0];
  }

  selectWork(selectedWork: WorkExperience) {
    this.selectedWork = selectedWork;
    let element = document.getElementById('work-content');
    if (element) {
      element.scroll({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}
