import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIntimationComponent } from './search-intimation.component';

describe('SearchIntimationComponent', () => {
  let component: SearchIntimationComponent;
  let fixture: ComponentFixture<SearchIntimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchIntimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchIntimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
