import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineeAndBankDetailsComponent } from './nominee-and-bank-details.component';

describe('NomineeAndBankDetailsComponent', () => {
  let component: NomineeAndBankDetailsComponent;
  let fixture: ComponentFixture<NomineeAndBankDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomineeAndBankDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NomineeAndBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
