import {Request, Router} from "express";

export abstract class ApiEndpoint {

  constructor(readonly endpoint: string) {
  }

  protected getEndpoint(): string {
    return this.endpoint;
  }

  getEndpointName(): string {
    return this.getEndpoint()
      .startsWith('/')
      ? this.getEndpoint().substr(1, this.getEndpoint().length).replace('-', ' ')
      : this.getEndpoint().replace('-', ' ');
  }

  getHTTPMethod(req: Request): string {
    return req.method;
  }

  abstract mount(router: Router): void;

}
