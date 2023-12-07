import { TestBed } from '@angular/core/testing';

import { CanDeactivateGaurdService } from './can-deactivate-gaurd.service';

describe('CanDeactivateGaurdService', () => {
  let service: CanDeactivateGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanDeactivateGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
