import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {ApiUtils} from "../../../../core/src";
import {Vote, VoteJsonSerializer} from "../../../../core/src/models/vote";
import {Database} from "../../../db/database";
import {GetEndpoint} from "../../get-endpoint";

export class ListVotesPassedEndpoint extends GetEndpoint {

    constructor(private db: Database) {
        super("/votes/passed/:userid");
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

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getPassed(req) ?
            ApiUtils.sendSerializedCollectionResult(this.getPassedVotes(req), VoteJsonSerializer.instance, res) :
            ApiUtils.sendSerializedCollectionResult(this.getFailedOrPendingVotes(req), VoteJsonSerializer.instance, res);
    }

}
