import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimDashboardComponent } from './claim-dashboard.component';

describe('ClaimDashboardComponent', () => {
  let component: ClaimDashboardComponent;
  let fixture: ComponentFixture<ClaimDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
