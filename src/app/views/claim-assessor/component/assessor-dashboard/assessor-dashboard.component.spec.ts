import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorDashboardComponent } from './assessor-dashboard.component';

describe('AssessorDashboardComponent', () => {
  let component: AssessorDashboardComponent;
  let fixture: ComponentFixture<AssessorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessorDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
