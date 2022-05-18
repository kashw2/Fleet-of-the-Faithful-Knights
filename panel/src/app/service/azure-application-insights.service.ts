import {ErrorHandler, Inject, Injectable} from '@angular/core';
import {ApplicationInsights, DistributedTracingModes, SeverityLevel} from "@microsoft/applicationinsights-web";

@Injectable({
  providedIn: 'root'
})
export class AzureApplicationInsightsService extends ErrorHandler {

  constructor(@Inject('applicationInsightsKey') private applicationInsightsKey: string) {
    super();
    this.applicationInsights.loadAppInsights();
  }


  applicationInsights: ApplicationInsights = new ApplicationInsights({
    config: {
      instrumentationKey: this.applicationInsightsKey,
      distributedTracingMode: DistributedTracingModes.AI_AND_W3C,
      enableAutoRouteTracking: true,
      enableAjaxErrorStatusText: true,
      enableRequestHeaderTracking: true,
      enableResponseHeaderTracking: true,
      enableUnhandledPromiseRejectionTracking: true,
    }
  });

  handleError(error: Error): void {
    this.applicationInsights.trackException({exception: error, severityLevel: SeverityLevel.Critical});
  }

}
