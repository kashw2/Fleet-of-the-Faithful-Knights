import {Request, Response, Router} from "express";
import {Either} from "funfix-core";
import {RouterUtil, User, UserJsonSerializer, userKey} from "../index";

export abstract class GetEndpoint {

    constructor(readonly endpoint: string) {
    }

    abstract canAccess(user: User): boolean;

    getEndpoint(): string {
        return this.endpoint;
    }

    getUser(req: Request): Either<string, User> {
        // This is still janky but works
        return RouterUtil.parseSerializedBodyParam(userKey, UserJsonSerializer.instance, req);
    }

    route(router: Router): void {
        router.get(this.getEndpoint(), (req, res) => this.run(this.getUser(req).get(), req, res));
    }

    run(user: User, req: Request, res: Response): void {
        if (this.canAccess(user)) {
            this.runRequest(req, res);
        } else {
            RouterUtil.sendUnauthorisedViaRouter(res);
        }
    }

    abstract runRequest(req: Request, res: Response): void;

}
