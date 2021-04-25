import {DbRequest} from "../db-request";
import {Group, GroupJsonSerializer, User, UserJsonSerializer} from "@kashw2/lib-ts";
import {Either} from "funfix-core";
import {List} from "immutable";

export class DbInsert {

    constructor(private requests: DbRequest) {
    }

    insertGroup(group: Group): (modifiedBy: string) => Promise<Either<string, Group>> {
        return (modifiedBy: string): Promise<Either<string, Group>> => {
            return this.requests.sendRequestSerialized('ssp_json_InsertGroup', List.of(`@Json = '${GroupJsonSerializer.instance.toJsonString(group)}'`, `@ModifiedBy = '${modifiedBy}'`), GroupJsonSerializer.instance)
        }
    }

    insertUser(user: User): (modifiedBy: string) => Promise<Either<string, User>> {
        return (modifiedBy: string): Promise<Either<string, User>> => {
            return this.requests.sendRequestSerialized('ssp_json_InsertUser', List.of(`@Json = '${UserJsonSerializer.instance.toJsonString(user)}'`, `@ModifiedBy = '${modifiedBy}'`), UserJsonSerializer.instance)
        }
    }

}
