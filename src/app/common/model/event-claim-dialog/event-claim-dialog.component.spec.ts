import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventClaimDialogComponent } from './event-claim-dialog.component';

describe('EventClaimDialogComponent', () => {
  let component: EventClaimDialogComponent;
  let fixture: ComponentFixture<EventClaimDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventClaimDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventClaimDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
