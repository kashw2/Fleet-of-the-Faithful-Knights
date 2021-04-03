import {Request, Response} from "express";
import {User, UserJsonSerializer} from "@kashw2/lib-ts";
import {Either} from "funfix-core";
import {EitherUtils} from "@kashw2/lib-util";

export abstract class ApiEndpoint {

    constructor(readonly endpoint: string) {
    }

    protected getEndpoint(): string {
        return this.endpoint;
    }

    getHTTPMethod(req: Request): string {
        return req.method;
    }

    getRequestUser(req: Request): Either<string, User> {
        return EitherUtils.liftEither(UserJsonSerializer.instance.fromJson(req.user), "Unable to serialize User");
    }

    getRequestUsername(req: Request): string {
        return this.getRequestUser(req)
            .toOption()
            .flatMap(u => u.getUsername())
            .getOrElse('System');
    }

    abstract hasPermission(req: Request, res: Response, user: User): boolean;

}
