import {UnauthenticatedCrudEndpoint} from "../src";
import {Router} from "express";
import {describe, test} from "vitest";

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

describe('UnauthenticatedCrudEndpoint', () => {
  test('UnauthenticatedCrudEndpoint should create endpoint', t => {
    const endpoint = new TestEndpoint('test');
    t.expect(endpoint.getEndpointName()).toEqual('test');
  });
});
