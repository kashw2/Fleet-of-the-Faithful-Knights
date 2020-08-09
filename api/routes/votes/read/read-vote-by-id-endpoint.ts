import {Request, Response} from "express";
import {Either} from "funfix-core";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";
import {Database} from "../../../db/database";
import { Vote, ApiUtils, User, VoteJsonSerializer } from "@ffk/lib-ts";

export class ReadVoteByIdEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/vote/id/:id", db);
    }

    getEndpointName(): string {
        return "Read Vote By Id";
    }

    private getVote(voteId: number): Either<string, Vote> {
        return this.db.cache.votes.getByVoteIdEither(voteId);
    }

    private getVoteId(req: Request): Either<string, number> {
        return ApiUtils.parseNumberFromPath(req, "id");
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getVoteId(req)
            .map(vid => ApiUtils.sendSerializedResponse(this.getVote(vid), VoteJsonSerializer.instance, res));
    }

}
