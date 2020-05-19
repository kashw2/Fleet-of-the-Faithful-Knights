import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, groupKey, User, UserJsonSerializer} from "../../../../core/src";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";
import {Database} from "../../../db/database";

export class ListUsersByGroupEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/users/:group", db);
    }

    private getGroup(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromPath(req, groupKey);
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getGroup(req)
            .map(g => ApiUtils.sendSerializedCollectionResult(this.db.cache.users.getUsersByGroup(g), UserJsonSerializer.instance, res));
    }

}
