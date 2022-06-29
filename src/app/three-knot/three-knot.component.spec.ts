import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeKnotComponent } from './three-knot.component';

describe('ThreeKnotComponent', () => {
  let component: ThreeKnotComponent;
  let fixture: ComponentFixture<ThreeKnotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreeKnotComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeKnotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
