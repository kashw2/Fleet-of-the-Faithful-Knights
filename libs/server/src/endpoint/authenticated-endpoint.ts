import {ApiEndpoint} from "./api-endpoint";
import {User, UserJsonSerializer} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {EitherUtils} from "@kashw2/lib-util";

export abstract class AuthenticatedEndpoint extends ApiEndpoint {

    constructor(readonly endpoint: string) {
        super(endpoint);
    }


    /**
     * For use cases where a certain endpoint requires auth in 99% of it's functionality however not all
     * and allows for exceptions to be made.
     */
    abstract doesRequireAuthentication(req: Request): boolean;

    getModifiedBy(req: Request): string {
        return `${this.getRequestUsername(req)} - ${this.getEndpointName()}`;
    }

    getRequestUser(req: Request): Either<string, User> {
        return EitherUtils.toEither(UserJsonSerializer.instance.fromJsonImpl(req.user), "Unable to Serialize User");
    }

    getRequestUsername(req: Request): string {
        return this.getRequestUser(req)
            .toOption()
            .flatMap(u => u.getUsername())
            .getOrElse('System');
    }

    abstract hasPermission(req: Request, res: Response, user: User): boolean;
}