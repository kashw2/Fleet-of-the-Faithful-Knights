import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {ApiUtils, User} from "../../../../core/src";
import {Vote, VoteJsonSerializer} from "../../../../core/src/models/vote";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";
import {Database} from "../../../db/database";

export class ListVotesBySponsorEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/votes/sponsor/:id", db);
    }

    private getUserId(req: Request): Either<string, number> {
        return ApiUtils.parseNumberFromPath(req, "id");
    }

    private getVotesBySponsorId(userId: number): Either<string, List<Vote>> {
        return this.db.cache.votes.getBySponsorId(userId);
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getUserId(req)
            .map(uid => ApiUtils.sendSerializedCollectionResult(this.getVotesBySponsorId(uid), VoteJsonSerializer.instance, res));
    }

}
