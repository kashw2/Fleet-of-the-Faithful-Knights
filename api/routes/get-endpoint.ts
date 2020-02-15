import {RouteManager} from "./route-manager";
import {Request, Response, Router} from "express";

export abstract class GetEndpoint extends RouteManager {

    constructor(private endpoint: string) {
        super();
    }

    routeEndpoint(router: Router): void {
        router.get(this.getEndpoint(), ((req, res, next) => {
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

    isAuthorized(): boolean {
        return false;
    }

    private getEndpoint(): string {
        return this.endpoint;
    }

    abstract run(req: Request, res: Response): void;

}
