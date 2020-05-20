import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {ApiUtils, User} from "../../../../core/src";
import {News, NewsJsonSerializer} from "../../../../core/src/models/news";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";
import {Database} from "../../../db/database";

export class ListNewsEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/news", db);
    }

    private getNewsArticles(): Either<string, List<News>> {
        return this.db.cache.news.getNewsEither();
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getNewsArticles(), NewsJsonSerializer.instance, res);
    }

}
