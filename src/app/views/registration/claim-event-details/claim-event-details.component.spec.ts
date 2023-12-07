import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEventDetailsComponent } from './claim-event-details.component';

describe('ClaimEventDetailsComponent', () => {
  let component: ClaimEventDetailsComponent;
  let fixture: ComponentFixture<ClaimEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimEventDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaimEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
