import test from "ava";
import {UnauthenticatedEndpoint} from "../src";
import {Request, Response, Router} from "express";

class TestEndpoint extends UnauthenticatedEndpoint {

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

    runImpl(req: Request, res: Response): void {
        /**
         * Only needed otherwise Ava will report that router is unused.
         */
        req.rawHeaders;
        res.statusCode;
    }

}

test('UnauthenticatedEndpoint should create endpoint', t => {
    const endpoint = new TestEndpoint('test');
    t.is(endpoint.getEndpointName(), 'test');
});