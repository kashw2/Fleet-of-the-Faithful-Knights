import {Request, Response, Router} from "express";
import {RouteManager} from "../../../api/routes/route-manager";

export abstract class PostEndpoint extends RouteManager {

    constructor(private endpoint: string) {
        super();
    }

    private getEndpoint(): string {
        return this.endpoint;
    }

    routeEndpoint(router: Router): void {
        router.post(this.getEndpoint(), ((req, res, next) => {
            if (this.isAuthorized()) {
                try {
                    this.run(req, res);
                } catch (exception) {
                    res.sendStatus(500)
                        .send(exception);
                }
            } else {
                res.sendStatus(403);
            }
        }));
    }

    abstract run(req: Request, res: Response): void;
}
