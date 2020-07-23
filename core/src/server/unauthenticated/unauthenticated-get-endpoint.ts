import {Request, Response, Router} from "express";

export abstract class UnauthenticatedGetEndpoint {

    constructor(private endpoint: string) {
    }

    private getEndpoint(): string {
        return this.endpoint;
    }

    abstract getEndpointName(): string;

    routeEndpoint(router: Router): void {
        router.get(this.getEndpoint(), ((req, res, next) => {
            req.setTimeout(30000, () => res.sendStatus(408).send(`${this.getEndpoint()} Timed out`));
            try {
                this.run(req, res);
            } catch (exception) {
                res.sendStatus(500)
                    .send(exception);
            }
        }));
    }

    abstract run(req: Request, res: Response): void;

}
