import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, User} from "../../../../core/src";
import {Database} from "../../../db/database";
import {GetRoute} from "../../get-route";

export class ReadUserByTokenEndpoint extends GetRoute {

    constructor(private db: Database) {
        super("/user/token/:token");
    }

    private getToken(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromPath(req, "token");
    }

    private getUserFromToken(token: string): Either<string, User> {
        return this.db.cache.users.getUserByToken(token);
    }

    isAuthorized(): boolean {
        return false;
    }

    run(req: Request, res: Response): void {
        this.getToken(req)
            .map(t => ApiUtils.sendResult(this.getUserFromToken(t), res));
    }

}
