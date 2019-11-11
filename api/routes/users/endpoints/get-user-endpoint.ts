import {Request, Response} from "express";
import {Either} from "funfix-core";
import {passwordKey, PostEndpoint, RouterUtil, usernameKey} from "../../../core";
import {Database} from "../../../database/db";

export class GetUserEndpoint extends PostEndpoint {

    constructor(readonly db: Database) {
        super("/user/");
    }

    canAccess(): boolean {
        return true;
    }

    private getPassword(req: Request): Either<string, string> {
        return RouterUtil.parseStringBodyParam(passwordKey, req);
    }

    private getUsername(req: Request): Either<string, string> {
        return RouterUtil.parseStringBodyParam(usernameKey, req);
    }

    runRequest(req: Request, res: Response): void {
    }

}
