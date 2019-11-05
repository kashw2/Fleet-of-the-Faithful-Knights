import {Request, Response, Router} from "express";

export class PostEndpoint {

    constructor(readonly endpoint: string) {

    }

    getEndpoint(): string {
        return this.endpoint;
    }

    route(router: Router): void {
        router.post(this.getEndpoint(), (req, res) => this.runRequest(req, res));
    }

    runRequest(req: Request, res: Response): void {

    }

}
