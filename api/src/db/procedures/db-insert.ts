import {DbRequest} from "../db-request";
import {User, UserJsonSerializer} from "@kashw2/lib-ts";
import {Either} from "funfix-core";
import {List} from "immutable";

export class DbInsert {

    constructor(private requests: DbRequest) {
    }

    insertUser(user: User): (modifiedBy: string) => Promise<Either<string, User>> {
        return (modifiedBy: string): Promise<Either<string, User>> => {
            return this.requests.sendRequestSerialized('ssp_json_InsertUser', List.of(`@Json = '${UserJsonSerializer.instance.toJsonString(user)}'`, `@ModifiedBy = '${modifiedBy}'`), UserJsonSerializer.instance)
        }
    }

}
