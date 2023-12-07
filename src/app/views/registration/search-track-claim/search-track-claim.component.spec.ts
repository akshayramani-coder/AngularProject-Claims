import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrackClaimComponent } from './search-track-claim.component';

describe('SearchTrackClaimComponent', () => {
  let component: SearchTrackClaimComponent;
  let fixture: ComponentFixture<SearchTrackClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTrackClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTrackClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
