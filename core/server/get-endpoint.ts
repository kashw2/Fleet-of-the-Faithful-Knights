import {Request, Response, Router} from "express";
import {Either} from "funfix-core";
import {EitherUtils, RouterUtil, User, UserJsonSerializer, userKey} from "..";

export abstract class GetEndpoint {

    constructor(readonly endpoint: string) {
    }

    abstract canAccess(user: User): boolean;

    getEndpoint(): string {
        return this.endpoint;
    }

    getUser(req: Request): Either<string, User> {
        return EitherUtils.liftEither(UserJsonSerializer.instance.toType(req.body[userKey]), "No user");
    }

    route(router: Router): void {
        router.get(this.getEndpoint(), (req, res) => this.run(this.getUser(req).get(), req, res));
    }

    run(user: User, req: Request, res: Response): void {
        if (this.canAccess(user)) {
            this.runRequest(req, res);
        } else {
            RouterUtil.sendUnauthorised(res);
        }
    }

    abstract runRequest(req: Request, res: Response): void;


}
