import {AuthenticatedCrudEndpoint} from "@kashw2/lib-server";
import {Database} from "../db/database";
import {User, Vote, VoteJsonSerializer} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils} from "@kashw2/lib-util";

export class VotesEndpoint extends AuthenticatedCrudEndpoint {

    constructor(private db: Database) {
        super('/vote');
    }

    create(req: Request): Promise<Either<string, any>> {
        return EitherUtils.sequence(this.validate(req)
            .map(v => {
                this.db.cache.votes.add(v);
                return this.db.procedures.insert.insertVote(v)(this.getModifiedBy(req));
            }))
            .then(v => v.map(u => VoteJsonSerializer.instance.toJsonImpl(u)));
    }

    delete(req: Request): Promise<Either<string, any>> {
        return EitherUtils.sequence(this.getVoteId(req)
            .map(vid => this.db.procedures.delete.deleteVote(vid)))
            .then(v => v.map(x => VoteJsonSerializer.instance.toJsonImpl(x)));
    }

    doesRequireAuthentication(req: Request): boolean {
        return true;
    }

    private getVote(req: Request): Either<string, Vote> {
        return ApiUtils.parseBodyParamSerialized(req, 'vote', VoteJsonSerializer.instance);
    }

    private getVoteId(req: Request): Either<string, string> {
        return ApiUtils.parseStringQueryParam(req, 'vote_id');
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

    read(req: Request): Promise<Either<string, any>> {
        if (this.getVoteId(req).isLeft()) {
            return Promise.resolve(EitherUtils.liftEither(VoteJsonSerializer.instance.toJsonArray(this.db.cache.votes.getVotes().toArray()), "Groups cache is empty"));
        }
        return Promise.resolve(this.getVoteId(req)
            .flatMap(vid => this.db.cache.votes.getByVoteId(vid)))
            .then(v => v.map(x => VoteJsonSerializer.instance.toJsonImpl(x)));
    }

    update(req: Request): Promise<Either<string, any>> {
        return Promise.resolve(this.getVote(req)
            .flatMap(v => this.validate(req))
            .map(v => this.db.procedures.update.updateVote(v)(this.getRequestUsername(req))));
    }

    private validate(req: Request): Either<string, Vote> {
        switch (this.getHTTPMethod(req)) {
            case 'PUT':
                return this.getVote(req)
                    .filterOrElse(v => v.getId().nonEmpty(), () => 'Vote must have an Id')
                    .filterOrElse(v => v.getCandidate().flatMap(c => c.getId()).nonEmpty(), () => 'Candidate must have an Id')
                    .filterOrElse(v => v.getSponsorId().nonEmpty(), () => 'Sponsor must have an Id');
            case 'POST':
                return this.getVote(req)
                    .filterOrElse(v => v.getCandidate().flatMap(c => c.getId()).nonEmpty(), () => 'Candidate must have an Id')
                    .filterOrElse(v => v.getSponsorId().nonEmpty(), () => 'Sponsor must have an Id');

            default:
                return this.getVote(req);
        }
    }

}