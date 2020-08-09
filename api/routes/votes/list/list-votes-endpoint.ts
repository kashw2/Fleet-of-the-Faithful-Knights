import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";
import {Database} from "../../../db/database";
import { Vote, User, ApiUtils, VoteJsonSerializer } from "@ffk/lib-ts";

export class ListVotesEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/votes", db);
    }

    private getAllVotes(): Either<string, List<Vote>> {
        return this.db.cache.votes.getVotesEither();
    }

    getEndpointName(): string {
        return "List Votes";
    }

    isAuthorized(user: User): boolean {
        return !user.isGuest();
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getAllVotes(), VoteJsonSerializer.instance, res);
    }

}
