import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils} from "../../../../core/src";
import {DbVote} from "../../../../core/src/models/db/db-vote";
import {Vote, VoteJsonSerializer} from "../../../../core/src/models/vote";
import {Database} from "../../../db/database";
import {PostEndpoint} from "../../post-endpoint";

export class WriteVoteEndpoint extends PostEndpoint {

    constructor(private db: Database) {
        super("/vote/write");
    }

    private getVote(req: Request): Either<string, Vote> {
        return ApiUtils.parseSerializedFromBody(req, "vote", VoteJsonSerializer.instance);
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getVote(req)
            .map(vote => {
                DbVote.fromVote(vote)
                    .map(dbVote => ApiUtils.sendResultPromise(this.db.procedures.insert.insertVote(dbVote), res));
            });
    }

}
