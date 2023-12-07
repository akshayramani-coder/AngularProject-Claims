import { TestBed } from '@angular/core/testing';

import { AllCommonService } from './all-common.service';

describe('AllCommonService', () => {
  let service: AllCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
