import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuredDetailsComponent } from './assured-details.component';

describe('AssuredDetailsComponent', () => {
  let component: AssuredDetailsComponent;
  let fixture: ComponentFixture<AssuredDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssuredDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssuredDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
