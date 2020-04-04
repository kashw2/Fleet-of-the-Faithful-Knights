import {Either} from "funfix-core";
import {List} from "immutable";
import {User, UserJsonSerializer} from "../../../core/src";
import {News, NewsJsonSerializer} from "../../../core/src/models/news";
import {DbRequest} from "../db-request";
import {Vote, VoteJsonSerializer} from "../../../core/src/models/vote";

export class DbRead {

    constructor(private requests: DbRequest) {
    }

    getNews(): Promise<Either<string, List<News>>> {
        return this.requests.sendRequestListSerialized("ssp_json_GetNews", List.of(), NewsJsonSerializer.instance);
    }

    getUsers(): Promise<Either<string, List<User>>> {
        return this.requests.sendRequestListSerialized("ssp_json_GetUsers", List.of(), UserJsonSerializer.instance);
    }

    getVotes(): Promise<Either<string, List<Vote>>> {
        return this.requests.sendRequestListSerialized("ssp_json_GetVotes", List.of(), VoteJsonSerializer.instance);
    }

}
