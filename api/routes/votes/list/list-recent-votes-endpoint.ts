import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {ApiUtils} from "../../../../core/src";
import {Vote, VoteJsonSerializer} from "../../../../core/src/models/vote";
import {Database} from "../../../db/database";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";

export class ListRecentVotesEndpoint extends GetEndpoint {

    constructor(private db: Database) {
        super("/votes/recent/:amount");
    }

    private getAmount(req: Request): Either<string, number> {
        return ApiUtils.parseNumberFromPath(req, "amount");
    }

    getRecentVotes(req: Request): Either<string, List<Vote>> {
        return this.getAmount(req)
            .flatMap(n => this.db.cache.votes.getLastVotes(n));
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getRecentVotes(req), VoteJsonSerializer.instance, res);
    }

}
