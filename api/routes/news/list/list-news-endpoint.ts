import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {ApiUtils} from "../../../../core/src";
import {News, NewsJsonSerializer} from "../../../../core/src/models/news";
import {Database} from "../../../db/database";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";

export class ListNewsEndpoint extends GetEndpoint {

    constructor(private db: Database) {
        super("/news");
    }

    private getNewsArticles(): Either<string, List<News>> {
        return this.db.cache.news.getNewsEither();
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getNewsArticles(), NewsJsonSerializer.instance, res);
    }

}
