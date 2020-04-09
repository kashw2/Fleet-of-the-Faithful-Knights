import { TestBed } from '@angular/core/testing';

import { FfkApiReadService } from './ffk-api-read.service';

describe('FfkApiReadService', () => {
  let service: FfkApiReadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FfkApiReadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
