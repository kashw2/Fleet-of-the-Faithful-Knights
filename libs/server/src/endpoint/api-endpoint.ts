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

    getEndpointName(): string {
        return this.getEndpoint()
            .startsWith('/')
            ? this.getEndpoint().substr(1, this.getEndpoint().length).replace('-', ' ')
            : this.getEndpoint().replace('-', ' ')
    }

    getHTTPMethod(req: Request): string {
        return req.method;
    }

    getModifiedBy(req: Request): string {
        return `${this.getRequestUsername(req)} - ${this.getEndpointName()}`;
    }

    getRequestUser(req: Request): Either<string, User> {
        return EitherUtils.toEither(UserJsonSerializer.instance.fromJsonImpl(req.user), "Unable to serialize User");
    }

    getRequestUsername(req: Request): string {
        return this.getRequestUser(req)
            .toOption()
            .flatMap(u => u.getUsername())
            .getOrElse('System');
    }

    abstract hasPermission(req: Request, res: Response, user: User): boolean;

}
