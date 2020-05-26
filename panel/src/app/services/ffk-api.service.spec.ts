import { TestBed } from '@angular/core/testing';

import { FfkApiService } from './ffk-api.service';

describe('FfkApiService', () => {
  let service: FfkApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FfkApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
