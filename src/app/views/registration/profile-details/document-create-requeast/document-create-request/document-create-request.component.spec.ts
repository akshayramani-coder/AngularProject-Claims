import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCreateRequestComponent } from './document-create-request.component';

describe('DocumentCreateRequestComponent', () => {
  let component: DocumentCreateRequestComponent;
  let fixture: ComponentFixture<DocumentCreateRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCreateRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCreateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
