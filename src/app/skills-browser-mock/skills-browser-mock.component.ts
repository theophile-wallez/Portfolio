import { Component, OnInit } from '@angular/core';
export interface Tech {
  name: string;
  logoName: string;
}

@Component({
  selector: 'skills-browser-mock',
  templateUrl: './skills-browser-mock.component.html',
  styleUrls: ['./skills-browser-mock.component.scss'],
})
export class SkillsBrowserMockComponent implements OnInit {
  logoFolderPath: string = '../../assets/img/skills/';
  selectedTab: string = 'frontend';
  techSides: Map<string, Tech[]> = new Map<string, Tech[]>();

  ngOnInit(): void {
    this.techSides.set('frontend', [
      { name: 'Angular', logoName: 'angular.svg' },
      { name: 'TypeScript', logoName: 'typescript.svg' },
      { name: 'JavaScript', logoName: 'javascript.svg' },
      { name: 'PrimeNG', logoName: 'primeng.svg' },
      { name: 'HTML', logoName: 'html.svg' },
      { name: 'Sass', logoName: 'sass.svg' },
    ]);

    this.techSides.set('backend', [
      { name: 'Spring', logoName: 'spring.svg' },
      { name: 'NodeJS', logoName: 'nodejs.svg' },
      { name: 'C# (.NET)', logoName: 'csharp.svg' },
      { name: 'SQL', logoName: 'mysql.svg' },
      { name: 'Firebase', logoName: 'firebase.svg' },
    ]);

    this.techSides.set('tools', [
      { name: 'Git', logoName: 'git.svg' },
      { name: 'Github', logoName: 'github.svg' },
      { name: 'SVN', logoName: 'svn.svg' },
      { name: 'VS Code', logoName: 'vs-code.svg' },
      { name: 'IntelliJ', logoName: 'intellij-idea.svg' },
      { name: 'VS', logoName: 'visual-studio.svg' },
    ]);
  }

  changeTab(tabName: string): void {
    this.selectedTab = tabName;
  }
  asIsOrder(a, b) {
    return 1;
  }
}
