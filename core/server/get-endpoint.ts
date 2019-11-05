import {Request, Response, Router} from "express";

export class GetEndpoint {

    constructor(readonly endpoint: string) {

    }

    getEndpoint(): string {
        return this.endpoint;
    }

    route(router: Router): void {
        router.get(this.getEndpoint(), (req, res) => this.runRequest(req, res));
    }

    runRequest(req: Request, res: Response): void {

    }

}
