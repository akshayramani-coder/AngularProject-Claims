import { TestBed } from '@angular/core/testing';

import { MustMatchValidatorService } from './must-match-validator.service';

describe('MustMatchValidatorService', () => {
  let service: MustMatchValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MustMatchValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
