import {Database} from "../database";
import {List} from "immutable";
import {News, NewsJsonSerializer} from "../../../core/src/models/news";
import {User, UserJsonSerializer} from "../../../core/src";
import {Either} from "funfix-core";
import {DbRequest} from "../db-request";

export class DbRead {

    constructor(private requests: DbRequest) {
    }

    getNews(): Promise<Either<string, List<News>>> {
        return this.requests.sendRequestListSerialized('ssp_json_GetNews', List.of(), NewsJsonSerializer.instance);
    }

    getUsers(): Promise<Either<string, List<User>>> {
        return this.requests.sendRequestListSerialized('ssp_json_GetUsers', List.of(), UserJsonSerializer.instance)
    }

}
