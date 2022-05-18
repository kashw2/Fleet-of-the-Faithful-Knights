import test from "ava";
import {UnauthenticatedCrudEndpoint} from "../src";
import {Router} from "express";

class TestEndpoint extends UnauthenticatedCrudEndpoint {

  constructor(readonly endpoint: string) {
    super(endpoint);
  }

  mount(router: Router): void {
    /**
     * Only needed otherwise Ava will report that router is unused.
     */
    router.arguments;
  }

}

test('UnauthenticatedCrudEndpoint should create endpoint', t => {
  const endpoint = new TestEndpoint('test');
  t.is(endpoint.getEndpointName(), 'test');
});