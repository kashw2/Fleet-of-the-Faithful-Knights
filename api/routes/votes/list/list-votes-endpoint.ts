import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {ApiUtils, User} from "../../../../core/src";
import {Vote, VoteJsonSerializer} from "../../../../core/src/models/vote";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";
import {Database} from "../../../db/database";

export class ListVotesEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/votes", db);
    }

    private getAllVotes(): Either<string, List<Vote>> {
        return this.db.cache.votes.getVotesEither();
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getAllVotes(), VoteJsonSerializer.instance, res);
    }

}
