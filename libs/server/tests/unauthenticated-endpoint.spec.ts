import {UnauthenticatedEndpoint} from "../src";
import {Router, Request, Response} from "express";

class TestEndpoint extends UnauthenticatedEndpoint {

    constructor(readonly endpoint: string) {
        super(endpoint);
    }

    mount(router: Router): void {
    }

    runImpl(req: Request, res: Response): void {
    }

}

describe('Unauthenticated Endpoint', () => {
    it('should create endpoint', () => {
        const endpoint = new TestEndpoint('test');
        expect(endpoint.getEndpointName()).toBe('test');
    });
});