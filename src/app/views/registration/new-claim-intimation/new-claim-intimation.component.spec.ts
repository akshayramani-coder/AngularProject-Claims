import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClaimIntimationComponent } from './new-claim-intimation.component';

describe('NewClaimIntimationComponent', () => {
  let component: NewClaimIntimationComponent;
  let fixture: ComponentFixture<NewClaimIntimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClaimIntimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClaimIntimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
