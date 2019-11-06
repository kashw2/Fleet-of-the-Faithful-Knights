import {Request, Response, Router} from "express";

export abstract class PostEndpoint {

    constructor(readonly endpoint: string) {
    }

    getEndpoint(): string {
        return this.endpoint;
    }

    route(router: Router): void {
        router.post(this.getEndpoint(), (req, res) => this.runRequest(req, res));
    }

    abstract runRequest(req: Request, res: Response): void;

}
