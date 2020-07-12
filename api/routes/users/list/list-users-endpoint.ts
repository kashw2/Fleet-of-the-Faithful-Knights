import {Request, Response} from "express";
import {ApiUtils, GetEndpoint, User, UserJsonSerializer} from "../../../../core/src";
import {Database} from "../../../db/database";
import {Either} from "funfix-core";
import {List} from "immutable";

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
        // TODO: Implement permissions
        return user.isDeveloper();
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getUsers(), UserJsonSerializer.instance, res);
    }

}
