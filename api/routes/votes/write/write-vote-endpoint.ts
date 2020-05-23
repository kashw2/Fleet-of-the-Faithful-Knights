import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, User} from "../../../../core/src";
import {DbVote} from "../../../../core/src/models/db/db-vote";
import {Vote, VoteJsonSerializer} from "../../../../core/src/models/vote";
import {PostEndpoint} from "../../../../core/src/server/post-endpoint";
import {Database} from "../../../db/database";

export class WriteVoteEndpoint extends PostEndpoint {

    constructor(readonly db: Database) {
        super("/vote/write/", db);
    }

    private doesVoteExist(vote: Vote): boolean {
        return vote.getCandidate()
            .map(c => this.db.cache.votes.doesVoteExistForCandidate(c))
            .getOrElse(false);
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
                    ? res.send("Vote already exists")
                    : DbVote.fromVote(vote)
                        .map(dbVote => ApiUtils.sendResultPromise(this.db.procedures.insert.insertVote(dbVote), res));
                this.db.cache.cacheVotes();
            });
    }

}
