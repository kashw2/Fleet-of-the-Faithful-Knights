import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, groupKey, UserJsonSerializer} from "../../../../core/src";
import {Database} from "../../../db/database";
import {GetEndpoint} from "../../get-endpoint";

export class ListUsersByGroupEndpoint extends GetEndpoint {

    constructor(private db: Database) {
        super("/users/:group");
    }

    private getGroup(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromPath(req, groupKey);
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getGroup(req)
            .map(g => ApiUtils.sendSerializedCollectionResult(this.db.cache.users.getUsersByGroup(g), UserJsonSerializer.instance, res));
    }

}
