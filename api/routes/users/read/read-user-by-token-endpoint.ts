import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, User, UserJsonSerializer} from "@ffk/lib-ts";
import {Database} from "../../../db/database";
import { GetEndpoint } from "../../../../core/src/server/get-endpoint";

export class ReadUserByTokenEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/user/token/:token", db);
    }

    getEndpointName(): string {
        return "Read User By Token"
    }

    private getToken(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromPath(req, "token");
    }

    private getUserFromToken(token: string): Either<string, User> {
        return this.db.cache.users.getUserByToken(token);
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getToken(req)
            .map(t => ApiUtils.sendSerializedResponse(this.getUserFromToken(t), UserJsonSerializer.instance, res));
    }

}
