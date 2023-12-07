import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProfileDetailsComponent } from './all-profile-details.component';

describe('AllProfileDetailsComponent', () => {
  let component: AllProfileDetailsComponent;
  let fixture: ComponentFixture<AllProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProfileDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
