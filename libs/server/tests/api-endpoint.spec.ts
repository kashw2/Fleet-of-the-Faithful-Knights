import {ApiEndpoint} from "../src";
import {Router} from "express";

class TestEndpoint extends ApiEndpoint {

    constructor(readonly endpoint: string) {
        super(endpoint);
    }

    mount(router: Router): void {
    }

}

describe('Api Endpoint', () => {
    it('should create endpoint', () => {
        const endpoint = new TestEndpoint('test');
        expect(endpoint.getEndpointName()).toBe('test');
    });
});