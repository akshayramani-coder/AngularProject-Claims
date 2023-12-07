import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeAssuredDetailsComponent } from './life-assured-details.component';

describe('LifeAssuredDetailsComponent', () => {
  let component: LifeAssuredDetailsComponent;
  let fixture: ComponentFixture<LifeAssuredDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeAssuredDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeAssuredDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
