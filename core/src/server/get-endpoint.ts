import {Request, Response, Router} from "express";
import {RouteManager} from "./route-manager";
import {ApiUtils} from "..";
import {Database} from "../../../api/db/database";

export abstract class GetEndpoint extends RouteManager {

    constructor(
        private endpoint: string,
        protected db: Database,
    ) {
        super();
    }

    private getEndpoint(): string {
        return this.endpoint;
    }

    routeEndpoint(router: Router): void {
        router.get(this.getEndpoint(), ((req, res, next) => {
            this.getApiUser(req, this.db)
                .forEach(user => {
                    if (this.isAuthorized(user)) {
                        try {
                            this.run(req, res);
                        } catch (exception) {
                            res.sendStatus(500)
                                .send(exception);
                        }
                    } else {
                        res.sendStatus(403);
                    }
                });
            if (this.getApiUser(req, this.db).isLeft()) {
                ApiUtils.sendError(this.getApiUser(req, this.db), res);
            }
        }));
    }

    abstract run(req: Request, res: Response): void;

}
