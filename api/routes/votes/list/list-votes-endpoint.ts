import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {ApiUtils} from "../../../../core/src";
import {Vote, VoteJsonSerializer} from "../../../../core/src/models/vote";
import {Database} from "../../../db/database";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";

export class ListVotesEndpoint extends GetEndpoint {

    constructor(private db: Database) {
        super("/votes");
    }

    private getAllVotes(): Either<string, List<Vote>> {
        return this.db.cache.votes.getVotesEither();
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getAllVotes(), VoteJsonSerializer.instance, res);
    }

}
