import test from "ava";
import {AuthenticatedEndpoint} from "../src";
import {Router, Request, Response} from "express";
import { User } from "@kashw2/lib-ts";

class TestEndpoint extends AuthenticatedEndpoint {

    constructor(readonly endpoint: string) {
        super(endpoint);
    }

    doesRequireAuthentication(req: Request): boolean {
        return false;
    }

    hasPermission(req: Request, res: Response, user: User): boolean {
        return false;
    }

    mount(router: Router): void {
    }

}

test('ApiEndpoint should create endpoint', t => {
    const endpoint = new TestEndpoint('test');
    t.is(endpoint.getEndpointName(), 'test');
});