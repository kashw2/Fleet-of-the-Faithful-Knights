import {ApiUtils, GetEndpoint, User} from "../../../../core/src";
import {Database} from "../../../db/database";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {Enum, EnumJsonSerializer} from "../../../../core/src/models/enum";
import {Set} from "immutable";

export class ListPermissionsEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/permissions", db);
    }

    private getPermissions(): Either<string, Set<Enum>> {
        return this.db.cache.permissions.getEnumsEither();
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getPermissions(), EnumJsonSerializer.instance, res);
    }

}

