import {ApiUtils, GetEndpoint, User} from "../../../../core/src";
import {Database} from "../../../db/database";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {Permission, PermissionJsonSerializer} from "../../../../core/src/models/permission";

export class ListPermissionsEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/permissions", db);
    }

    private getPermissions(): Either<string, List<Permission>> {
        return this.db.cache.permissions.getPermissionsEither();
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getPermissions(), PermissionJsonSerializer.instance, res);
    }

}

