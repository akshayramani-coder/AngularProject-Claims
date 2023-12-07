import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimProfileDetailsComponent } from './claim-profile-details.component';

describe('ClaimProfileDetailsComponent', () => {
  let component: ClaimProfileDetailsComponent;
  let fixture: ComponentFixture<ClaimProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimProfileDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
