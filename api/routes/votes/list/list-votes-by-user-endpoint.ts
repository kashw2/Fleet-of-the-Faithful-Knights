import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {ApiUtils} from "../../../../core/src";
import {Vote, VoteJsonSerializer} from "../../../../core/src/models/vote";
import {Database} from "../../../db/database";
import {GetEndpoint} from "../../get-endpoint";

export class ListVotesByUserEndpoint extends GetEndpoint {

    constructor(private db: Database) {
        super("/votes/user/:id");
    }

    private getUserId(req: Request): Either<string, number> {
        return ApiUtils.parseNumberFromPath(req, "id");
    }

    private getVotesByUserId(userId: number): Either<string, List<Vote>> {
        return this.db.cache.votes.getByUserId(userId);
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        this.getUserId(req)
            .map(uid => ApiUtils.sendSerializedCollectionResult(this.getVotesByUserId(uid), VoteJsonSerializer.instance, res));
    }

}
