import {ApiUtils, GetEndpoint, User} from "../../../../core/src";
import {Database} from "../../../db/database";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {Set} from "immutable";

export class ListGroupsEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/groups", db);
    }

    private getGroups(): Either<string, Set<string>> {
        return this.db.cache.groups.getGroupsEither();
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendResult(this.getGroups(), res);
    }

}
