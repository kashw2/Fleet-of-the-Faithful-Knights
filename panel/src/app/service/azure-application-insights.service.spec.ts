import {TestBed} from '@angular/core/testing';

import {AzureApplicationInsightsService} from './azure-application-insights.service';

describe('AzureApplicationInsightsService', () => {
  let service: AzureApplicationInsightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureApplicationInsightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
