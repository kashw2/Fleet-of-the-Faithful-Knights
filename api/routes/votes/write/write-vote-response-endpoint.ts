import {Request, Response} from "express";
import {Either, Left, Right} from "funfix-core";
import {ApiUtils, User} from "../../../../core/src";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";
import {Database} from "../../../db/database";

export class WriteVoteResponseEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/vote/response/:voteid/:response", db);
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

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendError(this.getOnboardedResponse(req), res);
        Either.map3(
            this.getOnboardedResponse(req),
            this.getVoteId(req),
            this.getApiUser(req, this.db),
            (response, vid, user) => {
                user.getId().map(uid => ApiUtils.sendResultPromise(this.db.procedures.insert.insertVoteResponse(vid, uid, response), res));
                this.db.cache.cacheVotes();
            });
    }

}
