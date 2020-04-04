import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils} from "../../../../core/src";
import {Vote} from "../../../../core/src/models/vote";
import {Database} from "../../../db/database";
import {GetRoute} from "../../get-route";

export class ReadVoteByIdEndpoint extends GetRoute {

    constructor(private db: Database) {
        super("/vote/id/:id");
    }

    private getVote(voteId: number): Either<string, Vote> {
        return this.db.cache.votes.getByIdEither(voteId);
    }

    private getVoteId(req: Request): Either<string, number> {
        return ApiUtils.parseNumberFromPath(req, "id");
    }

    isAuthorized(): boolean {
        return false;
    }

    run(req: Request, res: Response): void {
        this.getVoteId(req)
            .map(vid => ApiUtils.sendResult(this.getVote(vid), res));
    }

}
