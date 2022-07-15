import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsBrowserMockComponent } from './skills-browser-mock.component';

describe('SkillsBrowserMockComponent', () => {
  let component: SkillsBrowserMockComponent;
  let fixture: ComponentFixture<SkillsBrowserMockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsBrowserMockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsBrowserMockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
