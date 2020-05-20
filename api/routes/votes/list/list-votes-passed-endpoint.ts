import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {ApiUtils, User} from "../../../../core/src";
import {Vote, VoteJsonSerializer} from "../../../../core/src/models/vote";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";
import {Database} from "../../../db/database";

export class ListVotesPassedEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/votes/passed/:userid", db);
    }

    private getFailedOrPendingVotes(req: Request): Either<string, List<Vote>> {
        return this.getUserId(req)
            .flatMap(uid => this.db.cache.votes.getFailedVotesByUserEither(uid))
            .map(vs => vs.take(this.getLimit(req)));
    }

    private getLimit(req: Request): number {
        return ApiUtils.parseNumberFromQuery(req, "limit")
            .getOrElse(100);
    }

    private getPassed(req: Request): boolean {
        return ApiUtils.parseBooleanFromQuery(req, "passed");
    }

    private getPassedVotes(req: Request): Either<string, List<Vote>> {
        return this.getUserId(req)
            .flatMap(uid => this.db.cache.votes.getPassedVotesByUserEither(uid))
            .map(vs => vs.take(this.getLimit(req)));
    }

    private getUserId(req: Request): Either<string, number> {
        return ApiUtils.parseNumberFromPath(req, "userid");
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getPassed(req) ?
            ApiUtils.sendSerializedCollectionResult(this.getPassedVotes(req), VoteJsonSerializer.instance, res) :
            ApiUtils.sendSerializedCollectionResult(this.getFailedOrPendingVotes(req), VoteJsonSerializer.instance, res);
    }

}
