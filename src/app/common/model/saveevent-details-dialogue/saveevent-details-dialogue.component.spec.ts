import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveeventDetailsDialogueComponent } from './saveevent-details-dialogue.component';

describe('SaveeventDetailsDialogueComponent', () => {
  let component: SaveeventDetailsDialogueComponent;
  let fixture: ComponentFixture<SaveeventDetailsDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveeventDetailsDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveeventDetailsDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
