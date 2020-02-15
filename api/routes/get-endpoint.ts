import {RouteManager} from "./route-manager";
import {Request, Response, Router} from "express";

export abstract class GetEndpoint extends RouteManager {

    constructor(private endpoint: string) {
        super();
    }

    isAuthorized(): boolean {
        return false;
    }

    routeEndpoint(router: Router): void {
        router.get(this.getEndpoint(), ((req, res, next) => {
            try {
                this.run(req, res);
            } catch (exception) {
                res.sendStatus(500)
                    .send(exception);
            }
        }))
    }

    abstract run(req: Request, res: Response): void;

    private getEndpoint(): string {
        return this.endpoint;
    }

}
