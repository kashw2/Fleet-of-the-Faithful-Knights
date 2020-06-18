import { TestBed } from '@angular/core/testing';

import { DiscordApiService } from './discord-api.service';

describe('DiscordApiService', () => {
  let service: DiscordApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscordApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
