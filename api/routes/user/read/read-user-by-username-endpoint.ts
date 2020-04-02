import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, UserJsonSerializer, usernameKey} from "../../../../core/src";
import {Database} from "../../../db/database";
import {GetRoute} from "../../get-route";

export class ReadUserByUsernameEndpoint extends GetRoute {

    constructor(private db: Database) {
        super("/user/username/:username");
    }

    private getName(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromPath(req, usernameKey);
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getName(req)
            .map(n => ApiUtils.sendSerializedResponse(this.db.cache.users.getUserByName(n), UserJsonSerializer.instance, res));
    }

}
