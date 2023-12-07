import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IibComponent } from './iib.component';

describe('IibComponent', () => {
  let component: IibComponent;
  let fixture: ComponentFixture<IibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
