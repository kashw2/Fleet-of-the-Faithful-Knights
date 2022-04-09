import test from "ava";
import {UnauthenticatedEndpoint} from "../src";
import {Request, Response, Router} from "express";

class TestEndpoint extends UnauthenticatedEndpoint {

    constructor(readonly endpoint: string) {
        super(endpoint);
    }

    mount(router: Router): void {
    }

    runImpl(req: Request, res: Response): void {
    }

}

test('UnauthenticatedEndpoint should create endpoint', t => {
    const endpoint = new TestEndpoint('test');
    t.is(endpoint.getEndpointName(), 'test');
});