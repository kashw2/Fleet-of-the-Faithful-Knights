import {Request, Response} from "express";
import {Either, Left} from "funfix-core";
import {List} from "immutable";
import {ApiUtils} from "../../../../core/src";
import {Vote, VoteJsonSerializer} from "../../../../core/src/models/vote";
import {Database} from "../../../db/database";
import {GetRoute} from "../../get-route";

export class ListVotesByTypeEndpoint extends GetRoute {

    constructor(private db: Database) {
        super("/votes/type/:type");
    }

    private getType(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromPath(req, "type");
    }

    private getVotesFromType(req: Request): Either<string, List<Vote>> {
        return this.getType(req)
            .flatMap(type => {
                switch (type) {
                    // Misc Types
                    case "All":
                        return this.db.cache.votes.getVotesEither();
                    case "Active":
                        return Left("Not implemented");
                    case "Recent":
                        return this.db.cache.votes.getLastVotes(15);
                    // Group Types
                    case "Knight":
                        return this.db.cache.votes.getKnightVotes();
                    case "Sergeant First Class":
                        return this.db.cache.votes.getSergeantFirstClassVotes();
                    case "Sergeant":
                        return this.db.cache.votes.getSergeantVotes();
                    case "Squire":
                        return this.db.cache.votes.getSquireVotes();
                    case "Companion at Arms":
                        return this.db.cache.votes.getCAAVotes();
                    default:
                        return Left("Vote type not recognised");
                }
            });
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getVotesFromType(req), VoteJsonSerializer.instance, res);
    }

}
