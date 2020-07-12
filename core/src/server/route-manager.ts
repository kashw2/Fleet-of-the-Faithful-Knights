import {Request} from "express";
import {Either} from "funfix-core";
import {ApiUtils, User} from "..";
import {Database} from "../../../api/db/database";

export abstract class RouteManager {

    protected getApiUser(req: Request, db: Database): Either<string, User> {
        return this.getUserToken(req)
            .flatMap(token => db.cache.users.getUserByToken(token));
    }

    abstract getEndpointName(): string;

    private getUserToken(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromHeader(req, "X-Api-Token");
    }

    abstract isAuthorized(user: User): boolean;

}
