import {DbRequest} from "../db-request";
import {User, UserJsonSerializer} from "@kashw2/lib-ts";
import {Either} from "funfix-core";
import {List} from "immutable";

export class DbUpdate {

    constructor(private request: DbRequest) {
    }

    updateUser(user: User): (modifiedBy: string) => Promise<Either<string, User>> {
        return (modifiedBy: string) => {
            return this.request.sendRequestSerialized('ssp_json_UpdateUser', List.of(`@Json = '${UserJsonSerializer.instance.toJsonString(user)}'`, `@ModifiedBy = '${modifiedBy}'`), UserJsonSerializer.instance);
        }
    }

}
