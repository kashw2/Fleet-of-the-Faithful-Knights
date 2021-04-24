import {DbRequest} from "../db-request";
import {Either} from "funfix-core";
import {Group, GroupJsonSerializer, User, UserJsonSerializer} from "@kashw2/lib-ts";
import {List} from "immutable";

export class DbRead {

    constructor(private requests: DbRequest) {
    }

    readGroups(): Promise<Either<string, List<Group>>> {
        return this.requests.sendRequestListSerialized('ssp_json_GetGroups', List(), GroupJsonSerializer.instance)
    }

    readUserByDiscordId(discordId: string): Promise<Either<string, User>> {
        return this.requests.sendRequestSerialized('ssp_json_GetUser', List.of(`@DiscordId = '${discordId}'`), UserJsonSerializer.instance)
    }

    readUsers(): Promise<Either<string, List<User>>> {
        return this.requests.sendRequestListSerialized('ssp_json_GetUsers', List(), UserJsonSerializer.instance);
    }

}
