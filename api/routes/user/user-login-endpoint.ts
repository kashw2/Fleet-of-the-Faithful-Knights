import {Request, Response} from "express";
import {Database} from "../../db/database";
import {Either, Option} from "funfix-core";
import {List} from "immutable";
import {ApiUtils, User, UserJsonSerializer, userKey} from "../../../core/src";
import {PostRoute} from "../post-route";

export class UserLoginEndpoint extends PostRoute {

    constructor(private db: Database) {
        super('/user/login');
    }

    private getUser(req: Request): Either<string, User> {
        return ApiUtils.parseSerializedFromBody(req, userKey, UserJsonSerializer.instance);
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getUser(req)
            .map(u => {
                Option.map2(u.getUsername(), u.getPassword(), (username, password) => {
                    this.db.requests.sendRequest('ssp_json_GetUserToken', List.of(`@Username = ${username}`, `@Password = ${password}`))
                        .then(x => ApiUtils.sendResult(x, res));
                })
            })
    }

}
