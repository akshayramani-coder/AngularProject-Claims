import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiTabRestrictionComponent } from './multi-tab-restriction.component';

describe('MultiTabRestrictionComponent', () => {
  let component: MultiTabRestrictionComponent;
  let fixture: ComponentFixture<MultiTabRestrictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiTabRestrictionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiTabRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
