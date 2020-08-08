import {Request, Response} from "express";
import {Either, Left} from "funfix-core";
import {PostEndpoint} from "../../../../core/src/server/post-endpoint";
import {Database} from "../../../db/database";
import { Vote, VoteJsonSerializer, ApiUtils, User, DbVote } from "@ffk/lib-ts";

export class WriteVoteEndpoint extends PostEndpoint {

    constructor(readonly db: Database) {
        super("/vote/write/", db);
    }

    private doesVoteExist(vote: Vote): boolean {
        return vote.getCandidate()
            .map(c => this.db.cache.votes.doesVoteExistForCandidate(c))
            .getOrElse(false);
    }

    getEndpointName(): string {
        return "Write Vote";
    }

    private getVote(req: Request): Either<string, Vote> {
        return ApiUtils.parseSerializedFromBody(req, "vote", VoteJsonSerializer.instance);
    }

    isAuthorized(user: User): boolean {
        return !user.isGuest();
    }

    run(req: Request, res: Response): void {
        this.getVote(req)
            .map(vote => {
                this.doesVoteExist(vote)
                    ? ApiUtils.sendError409(Left("Vote already exists"), res)
                    : DbVote.fromVote(vote)
                        .map(dbVote => ApiUtils.sendResultPromise(this.db.procedures.insert.insertVote(dbVote), res));
                this.db.cache.cacheVotes();
            });
    }

}
