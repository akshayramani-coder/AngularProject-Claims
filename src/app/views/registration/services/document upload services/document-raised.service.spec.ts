import { TestBed } from '@angular/core/testing';

import { DocumentRaisedService } from './document-raised.service';

describe('DocumentRaisedService', () => {
  let service: DocumentRaisedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentRaisedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
