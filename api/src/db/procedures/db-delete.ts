import {DbRequest} from "../db-request";
import {Either} from "funfix-core";
import {Group, GroupJsonSerializer, User, UserJsonSerializer} from "@kashw2/lib-ts";
import {List} from "immutable";

export class DbDelete {

    constructor(private requests: DbRequest) {
    }

    deleteGroup(groupId: string): Promise<Either<string, Group>> {
        return this.requests.sendRequestSerialized('ssp_json_DeleteGroup', List.of(`@GroupId = ${groupId}`), GroupJsonSerializer.instance);
    }

    deleteUser(userId: string): Promise<Either<string, User>> {
        return this.requests.sendRequestSerialized('ssp_json_DeleteUser', List.of(`@UserId = ${userId}`), UserJsonSerializer.instance);
    }

}
