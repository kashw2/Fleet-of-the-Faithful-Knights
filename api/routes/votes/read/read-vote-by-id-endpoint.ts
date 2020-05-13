import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils} from "../../../../core/src";
import {Vote, VoteJsonSerializer} from "../../../../core/src/models/vote";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";
import {Database} from "../../../db/database";

export class ReadVoteByIdEndpoint extends GetEndpoint {

    constructor(private db: Database) {
        super("/vote/id/:id");
    }

    private getVote(voteId: number): Either<string, Vote> {
        return this.db.cache.votes.getByVoteIdEither(voteId);
    }

    private getVoteId(req: Request): Either<string, number> {
        return ApiUtils.parseNumberFromPath(req, "id");
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getVoteId(req)
            .map(vid => ApiUtils.sendSerializedResponse(this.getVote(vid), VoteJsonSerializer.instance, res));
    }

}
