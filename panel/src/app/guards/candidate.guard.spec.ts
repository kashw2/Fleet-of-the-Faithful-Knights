import { TestBed } from '@angular/core/testing';

import { CandidateGuard } from './candidate.guard';

describe('CandidateGuard', () => {
  let guard: CandidateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CandidateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
