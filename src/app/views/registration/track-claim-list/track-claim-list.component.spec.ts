import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackClaimListComponent } from './track-claim-list.component';

describe('TrackClaimListComponent', () => {
  let component: TrackClaimListComponent;
  let fixture: ComponentFixture<TrackClaimListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackClaimListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackClaimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
