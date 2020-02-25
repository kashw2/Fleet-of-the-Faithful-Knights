import {PostRoute} from "../post-route";
import {Request, Response} from "express";
import {Database} from "../../db/database";
import {Either, Option} from "funfix-core";
import {User, UserJsonSerializer} from "../../../core/src/models/user";
import {ApiUtils} from "../../../core/src/util/api-utils";
import {userKey} from "../../../core/src/misc/json-keys";
import {List} from "immutable";

export class UserLoginEndpoint extends PostRoute {

    constructor(private db: Database) {
        super('/user/login');
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getUser(req)
            .map(u => {
                Option.map2(u.getUsername(), u.getPassword(), (username, password) => {
                    // Maybe we should incorporate something from the cache here
                    this.db.requests.sendRequest('ssp_json_GetUserToken', List.of(`@Username = ${username}`, `@Password = ${password}`))
                        .then(x => ApiUtils.sendResult(x, res));
                })
            })
    }

    private getUser(req: Request): Either<string, User> {
        return ApiUtils.parseSerializedFromBody(req, userKey, UserJsonSerializer.instance);
    }

}
