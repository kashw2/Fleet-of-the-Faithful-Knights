import {ApiUtils, User, EnumJsonSerializer, Enum} from "@ffk/lib-ts";
import {Database} from "../../../db/database";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {Set} from "immutable";
import { GetEndpoint } from "../../../../core/src/server/get-endpoint";

export class ListPermissionsEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/permissions", db);
    }

    getEndpointName(): string {
        return "List Permissions";
    }

    private getPermissions(): Either<string, Set<Enum>> {
        return this.db.cache.permissions.getEnumsEither();
    }

    isAuthorized(user: User): boolean {
        return !user.isGuest();
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getPermissions(), EnumJsonSerializer.instance, res);
    }

}

