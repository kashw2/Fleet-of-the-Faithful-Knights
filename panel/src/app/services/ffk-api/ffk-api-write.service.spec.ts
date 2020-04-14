import { TestBed } from '@angular/core/testing';

import { FfkApiWriteService } from './ffk-api-write.service';

describe('FfkApiWriteService', () => {
  let service: FfkApiWriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FfkApiWriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
