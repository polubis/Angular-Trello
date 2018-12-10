import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCartComponent } from './project-cart.component';

describe('ProjectCartComponent', () => {
  let component: ProjectCartComponent;
  let fixture: ComponentFixture<ProjectCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
