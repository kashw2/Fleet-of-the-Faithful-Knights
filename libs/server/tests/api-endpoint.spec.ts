import test from "ava";
import {ApiEndpoint} from "../src";
import {Router} from "express";


class TestEndpoint extends ApiEndpoint {

  constructor(readonly endpoint: string) {
    super(endpoint);
  }

  mount(router: Router): void {
    /**
     * Only needed otherwise Ava will report that router is unused.
     */
    router.arguments;
    return;
  }

}

test('ApiEndpoint should create endpoint', t => {
  const endpoint = new TestEndpoint('test');
  t.is(endpoint.getEndpointName(), 'test');
});

test('ApiEndpoint should return endpoint name without /', t => {
  const endpoint = new TestEndpoint('/test');
  t.is(endpoint.getEndpointName(), 'test');
});