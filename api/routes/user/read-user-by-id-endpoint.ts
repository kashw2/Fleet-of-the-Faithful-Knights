import {GetEndpoint} from "../get-endpoint";
import {Request, Response} from "express";
import {Database} from "../../db/database";
import {Either} from "funfix-core";
import {ApiUtils} from "../../../core/src/util/api-utils";
import {idKey} from "../../../core/src/misc/json-keys";
import {User} from "../../../core/src/models/user";

export class ReadUserByIdEndpoint extends GetEndpoint {

    constructor(private db: Database) {
        super('/user/:id');
    }

    async run(req: Request, res: Response): Promise<void> {
        this.getUserId(req)
            .map(uid => res.send(this.getUser(uid).value));
    }

    private getUser(userId: number): Either<string, User> {
        return this.db.cache.users.getByIdEither(userId);
    }

    isAuthorized(): boolean {
        return true;
    }

    // TODO: Make a method that can return the serialized result

    private getUserId(req: Request): Either<string, number> {
        return ApiUtils.parseNumberFromPath(req, idKey);
    }
}
