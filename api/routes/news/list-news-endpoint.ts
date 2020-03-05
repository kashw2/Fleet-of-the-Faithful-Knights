import {GetRoute} from "../get-route";
import {Database} from "../../db/database";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {News, NewsJsonSerializer} from "../../../core/src/models/news";
import {ApiUtils} from "../../../core/src";

export class ListNewsEndpoint extends GetRoute {

    constructor(private db: Database) {
        super('/news');
    }

    private getNewsArticles(): Either<string, List<News>> {
        return this.db.cache.news.getNewsEither()
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getNewsArticles(), NewsJsonSerializer.instance, res);
    }

}
