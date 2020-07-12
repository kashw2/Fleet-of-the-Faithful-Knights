import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {ApiUtils, User} from "../../../../core/src";
import {Vote, VoteJsonSerializer} from "../../../../core/src/models/vote";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";
import {Database} from "../../../db/database";

export class ListRecentVotesEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/votes/recent/:amount", db);
    }

    private getAmount(req: Request): Either<string, number> {
        return ApiUtils.parseNumberFromPath(req, "amount");
    }

    getEndpointName(): string {
        return "List Recent Votes";
    }

    getRecentVotes(req: Request): Either<string, List<Vote>> {
        return this.getAmount(req)
            .flatMap(n => this.db.cache.votes.getLastVotes(n));
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getRecentVotes(req), VoteJsonSerializer.instance, res);
    }

}
