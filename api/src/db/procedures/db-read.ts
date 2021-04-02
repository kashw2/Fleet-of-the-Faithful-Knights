import {DbRequest} from "../db-request";
import {Either} from "funfix-core";
import {User, UserJsonSerializer} from "@kashw2/lib-ts";
import {List} from "immutable";

export class DbRead {

    constructor(private requests: DbRequest) {
    }

    readUserByDiscordId(discordId: string): Promise<Either<string, User>> {
        return this.requests.sendRequestSerialized('ssp_json_GetUser', List.of(`@DiscordId = '${discordId}'`), UserJsonSerializer.instance)
    }

}
