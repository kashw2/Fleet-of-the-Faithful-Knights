import {DbRequest} from "../db-request";
import {Either} from "funfix-core";
import {User, UserJsonSerializer} from "@kashw2/lib-ts";
import {List} from "immutable";

export class DbDelete {

    constructor(private requests: DbRequest) {
    }

    deleteUser(userId: string): Promise<Either<string, User>> {
        return this.requests.sendRequestSerialized('ssp_json_DeleteUser', List.of(`@UserId = ${userId}`), UserJsonSerializer.instance);
    }

}
