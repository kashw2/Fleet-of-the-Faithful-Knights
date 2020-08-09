import {ApiUtils, User, Enum, EnumJsonSerializer} from "@ffk/lib-ts";
import {Database} from "../../../db/database";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {Set} from "immutable";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";

export class ListGroupsEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/groups", db);
    }

    getEndpointName(): string {
        return "List Groups";
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
