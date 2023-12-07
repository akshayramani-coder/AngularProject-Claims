import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignmentDashboardComponent } from './reassignment-dashboard.component';

describe('ReassignmentDashboardComponent', () => {
  let component: ReassignmentDashboardComponent;
  let fixture: ComponentFixture<ReassignmentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReassignmentDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReassignmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
