import { TestBed } from '@angular/core/testing';

import { LookupcodeService } from './lookupcode.service';

describe('LookupcodeService', () => {
  let service: LookupcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookupcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
