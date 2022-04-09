import test from "ava";
import {ApiEndpoint} from "../src";
import {Router} from "express";


class TestEndpoint extends ApiEndpoint {

    constructor(readonly endpoint: string) {
        super(endpoint);
    }

    mount(router: Router): void {
    }

}

test('ApiEndpoint should create endpoint', t => {
    const endpoint = new TestEndpoint('test');
    t.is(endpoint.getEndpointName(), 'test');
});