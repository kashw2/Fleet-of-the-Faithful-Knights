import {Request, Response} from "express";
import {User, UserJsonSerializer} from "@ffk/lib-ts";
import {Either} from "funfix-core";
import {EitherUtils} from "@ffk/lib-util";

export abstract class ApiEndpoint {

    constructor(readonly endpoint: string) {
    }

    protected getEndpoint(): string {
        return this.endpoint;
    }

    getHTTPMethod(req: Request): string {
        return req.method;
    }

    getUser(req: Request): Either<string, User> {
        return EitherUtils.toEither(UserJsonSerializer.instance.fromJsonImpl(req.user), "Unable to serialize User");
    }

    abstract hasPermission(req: Request, res: Response, user: User): boolean;

}
