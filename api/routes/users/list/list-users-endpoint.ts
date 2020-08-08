import {Request, Response} from "express";
import {ApiUtils, User, UserJsonSerializer} from "@ffk/lib-ts";
import {Database} from "../../../db/database";
import {Either} from "funfix-core";
import {List} from "immutable";
import { GetEndpoint } from "../../../../core/src/server/get-endpoint";

export class ListUsersEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/users", db);
    }

    getEndpointName(): string {
        return "List Users";
    }

    private getUsers(): Either<string, List<User>> {
        return this.db.cache.users.getUsersWithoutToken();
    }

    isAuthorized(user: User): boolean {
        return !user.isGuest();
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getUsers(), UserJsonSerializer.instance, res);
    }

}
