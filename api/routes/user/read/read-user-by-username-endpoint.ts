import {GetRoute} from "../../get-route";
import {Database} from "../../../db/database";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils} from "../../../../core/src/util/api-utils";
import {usernameKey} from "../../../../core/src/misc/json-keys";
import {UserJsonSerializer} from "../../../../core/src/models/user";

export class ReadUserByUsernameEndpoint extends GetRoute {

    constructor(private db: Database) {
        super('/user/username/:username');
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getName(req)
            .map(n => ApiUtils.sendSerializedResponse(this.db.cache.users.getUserByName(n), UserJsonSerializer.instance, res));
    }

    private getName(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromPath(req, usernameKey)
    }

}
