import {DbRequest} from "../db-request";
import {Group, GroupJsonSerializer, User, UserJsonSerializer} from "@kashw2/lib-ts";
import {Either} from "funfix-core";
import {List} from "immutable";

export class DbUpdate {

    constructor(private request: DbRequest) {
    }

    updateGroup(group: Group): (modifiedBy: string) => Promise<Either<string, Group>> {
        return (modifiedBy: string) => {
            return this.request.sendRequestSerialized('ssp_json_UpdateGroup', List.of(`@Json = '${GroupJsonSerializer.instance.toJsonString(group)}'`, `@ModifiedBy = '${modifiedBy}'`), GroupJsonSerializer.instance);
        }
    }

    updateUser(user: User): (modifiedBy: string) => Promise<Either<string, User>> {
        return (modifiedBy: string) => {
            return this.request.sendRequestSerialized('ssp_json_UpdateUser', List.of(`@Json = '${UserJsonSerializer.instance.toJsonString(user)}'`, `@ModifiedBy = '${modifiedBy}'`), UserJsonSerializer.instance);
        }
    }

}
