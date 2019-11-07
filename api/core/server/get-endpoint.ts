import {Request, Response, Router} from "express";
import {RouterUtil} from "../utils/router-util";

export abstract class GetEndpoint {

    constructor(readonly endpoint: string) {
    }

    abstract canAccess(): boolean;

    getEndpoint(): string {
        return this.endpoint;
    }

    route(router: Router): void {
        if (this.canAccess()) {
            router.get(this.getEndpoint(), (req, res) => this.runRequest(req, res));
        } else {
            router.get(this.getEndpoint(), (req, res) => RouterUtil.sendUnauthorisedViaRouter(req, res));
        }
    }

    abstract runRequest(req: Request, res: Response): void;

}
