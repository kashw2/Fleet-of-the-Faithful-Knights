import {Request, Response} from "express";
import {Either, Left, Right} from "funfix-core";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";
import {Database} from "../../../db/database";
import { ApiUtils, User } from "@ffk/lib-ts";

export class WriteVoteResponseEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/vote/response/:voteid/:response", db);
    }

    getEndpointName(): string {
        return "Write Vote Response";
    }

    private getOnboardedResponse(req: Request): Either<string, string> {
        return this.getResponse(req)
            .flatMap(response => {
                switch (response) {
                    case "Y":
                    case "N":
                        return Right(response);
                    default:
                        return Left("Unrecognized vote response");
                }
            });
    }

    private getResponse(req: Request): Either<string, string> {
        return ApiUtils.parseStringFromPath(req, "response");
    }

    private getVoteId(req: Request): Either<string, number> {
        return ApiUtils.parseNumberFromPath(req, "voteid");
    }

    private hasVoteFailed(req: Request): boolean {
        return this.getVoteId(req)
            .flatMap(vid => this.db.cache.votes.getByVoteIdEither(vid))
            .exists(v => v.hasFailed());
    }

    private hasVotePassed(req: Request): boolean {
        return this.getVoteId(req)
            .flatMap(vid => this.db.cache.votes.getByVoteIdEither(vid))
            .exists(v => v.hasPassed());
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    private isCapableOfVoting(req: Request): boolean {
        return !this.hasVotePassed(req) && !this.hasVoteFailed(req);
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendError(this.getOnboardedResponse(req), res);
        if (!this.isCapableOfVoting(req)) {
            ApiUtils.sendError409(Left("Vote has either passed or failed"), res);
            return;
        }
        Either.map3(
            this.getOnboardedResponse(req),
            this.getVoteId(req),
            this.getApiUser(req, this.db),
            (response, vid, user) => {
                user.getId()
                    .map(uid => ApiUtils.sendResultPromise(this.db.procedures.insert.insertVoteResponse(vid, uid, response), res));
                this.db.cache.cacheVotes();
            });
    }

}
