import {Database} from "../../../db/database";
import {GetRoute} from "../../get-route";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils} from "../../../../core/src/util/api-utils";
import {groupKey} from "../../../../core/src/misc/json-keys";
import {UserJsonSerializer} from "../../../../core/src/models/user";

export class ListUsersByGroupEndpoint extends GetRoute {

    constructor(private db: Database) {
        super('/users/:group');
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getGroup(req)
            .map(g => ApiUtils.sendSerializedCollectionResult(this.db.cache.users.getUsersByGroup(g), UserJsonSerializer.instance, res));
    }

    private getGroup(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromPath(req, groupKey);
    }

}
