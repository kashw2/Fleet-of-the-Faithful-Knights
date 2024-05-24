import {AuthenticatedCrudEndpoint} from "../src";
import {Request, Response, Router} from "express";
import {User} from "@kashw2/lib-ts";
import {describe, test} from "vitest";

class TestEndpoint extends AuthenticatedCrudEndpoint {

  constructor(readonly endpoint: string) {
    super(endpoint);
  }

  doesRequireAuthentication(req: Request): boolean {
    /**
     * Only needed otherwise Ava will report that router is unused.
     */
    req.rawHeaders;
    return false;
  }

  hasPermission(req: Request, res: Response, user: User): boolean {
    /**
     * Only needed otherwise Ava will report that router is unused.
     */
    req.rawHeaders;
    res.statusCode;
    user.getId();
    return false;
  }

  mount(router: Router): void {
    /**
     * Only needed otherwise Ava will report that router is unused.
     */
    router.arguments;
    return;
  }

}

describe('AuthenticatedCrudEndpoint', () => {
  test('AuthenticatedCrudEndpoint should create endpoint', t => {
    const endpoint = new TestEndpoint('test');
    t.expect(endpoint.getEndpointName()).toEqual('test');
  });
});
