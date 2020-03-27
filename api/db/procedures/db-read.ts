import {Database} from "../database";
import {List} from "immutable";
import {News, NewsJsonSerializer} from "../../../core/src/models/news";
import {User, UserJsonSerializer} from "../../../core/src";
import {Either} from "funfix-core";

export class DbRead {

    constructor(private db: Database) {
    }

    getNews(): Promise<Either<string, List<News>>> {
        return this.db.requests.sendRequestListSerialized('ssp_json_GetNews', List.of(), NewsJsonSerializer.instance);
    }

    getUsers(): Promise<Either<string, List<User>>> {
        return this.db.requests.sendRequestListSerialized('ssp_json_GetUsers', List.of(), UserJsonSerializer.instance)
    }

}
