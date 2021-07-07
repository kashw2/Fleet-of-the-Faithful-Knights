import {CrudEndpoint} from "@kashw2/lib-server";
import {Database} from "../db/database";
import {User, VoteJsonSerializer} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils} from "@kashw2/lib-util";

export class VotesEndpoint extends CrudEndpoint {

    constructor(private db: Database) {
        super('/votes');
    }

    delete(req: Request): Promise<Either<string, any>> {
        return super.delete(req);
    }

    update(req: Request): Promise<Either<string, any>> {
        return super.update(req);
    }

    private getVoteId(req: Request): Either<string, string> {
        return ApiUtils.parseStringQueryParam(req, 'vote_id');
    }

    read(req: Request): Promise<Either<string, any>> {
        return Promise.resolve(EitherUtils.liftEither(VoteJsonSerializer.instance.toJsonArray(this.db.cache.votes.getVotes().toArray()), "Groups cache is empty"))
    }

    create(req: Request): Promise<Either<string, any>> {
        return super.create(req);
    }

    hasPermission(req: Request, res: Response, user: User): boolean {
        switch (this.getHTTPMethod(req)) {
            case 'POST':
                return true;
            case 'GET':
                return true;
            case 'PUT':
                return true;
            case 'DELETE':
                return true;
            default:
                return false;
        }
    }

}