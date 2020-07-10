import {ApiUtils, GetEndpoint, User} from "../../../../core/src";
import {Database} from "../../../db/database";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {Set} from "immutable";
import {Enum, EnumJsonSerializer} from "../../../../core/src/models/enum";

export class ListGroupsEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/groups", db);
    }

    private getGroups(): Either<string, Set<Enum>> {
        return this.db.cache.groups.getEnumsEither();
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getGroups(), EnumJsonSerializer.instance, res);
    }

}
