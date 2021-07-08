import {CrudEndpoint} from "@kashw2/lib-server";
import {Database} from "../db/database";
import {User, Vote, VoteJsonSerializer} from "@kashw2/lib-ts";
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
        return Promise.resolve(this.getVote(req)
            .flatMap(v => this.validate(req))
            .map(v => this.db.procedures.update.updateVote(v)(this.getRequestUsername(req))))
    }

    private getVote(req: Request): Either<string, Vote> {
        return ApiUtils.parseBodyParamSerialized(req, 'vote', VoteJsonSerializer.instance);
    }

    private getVoteId(req: Request): Either<string, string> {
        return ApiUtils.parseStringQueryParam(req, 'vote_id');
    }

    read(req: Request): Promise<Either<string, any>> {
        if (this.getVoteId(req).isRight()) {
            return Promise.resolve(this.getVoteId(req)
                .flatMap(vid => this.db.cache.votes.getByVoteId(vid)))
                .then(v => v.map(x => VoteJsonSerializer.instance.toJsonImpl(x)));
        }
        return Promise.resolve(EitherUtils.liftEither(VoteJsonSerializer.instance.toJsonArray(this.db.cache.votes.getVotes().toArray()), "Groups cache is empty"))
    }

    create(req: Request): Promise<Either<string, any>> {
        return super.create(req);
    }

    private validate(req: Request): Either<string, Vote> {
        switch (this.getHTTPMethod(req)) {
            case 'PUT':
                return this.getVote(req)
                    .filterOrElse(v => v.getId().nonEmpty(), () => 'Vote must have an Id')
                    .filterOrElse(v => v.getCandidate().flatMap(c => c.getId()).nonEmpty(), () => 'Candidate must have an Id')
                    .filterOrElse(v => v.getSponsorId().nonEmpty(), () => 'Sponsor must have an Id')
            default:
                return this.getVote(req);
        }
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