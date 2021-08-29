import { TestBed } from '@angular/core/testing';

import { VoteGuard } from './vote.guard';

describe('VoteGuard', () => {
  let guard: VoteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VoteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
