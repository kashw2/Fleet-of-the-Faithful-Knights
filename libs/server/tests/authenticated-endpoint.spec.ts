import test from "ava";
import {AuthenticatedEndpoint} from "../src";
import {Request, Response, Router} from "express";
import {User} from "@kashw2/lib-ts";

class TestEndpoint extends AuthenticatedEndpoint {

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

test('AuthenticatedEndpoint should create endpoint', t => {
  const endpoint = new TestEndpoint('test');
  t.is(endpoint.getEndpointName(), 'test');
});