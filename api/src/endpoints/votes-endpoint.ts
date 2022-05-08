import {AuthenticatedCrudEndpoint} from "@kashw2/lib-server";
import {Database} from "../db/database";
import {GroupJsonSerializer, User, Vote, VoteJsonSerializer} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils} from "@kashw2/lib-util";
import {Future} from "funfix";

export class VotesEndpoint extends AuthenticatedCrudEndpoint {

    constructor(private db: Database) {
        super('/vote');
    }

    create(req: Request): Future<object> {
        return Future.of(() => {
            return EitherUtils.sequence(this.validate(req)
                .map(v => {
                    this.db.cache.votes.add(v);
                    return this.db.procedures.insert.insertVote(v)(this.getRequestUsername(req));
                }));
        }).flatMap(v => Future.fromPromise(v))
            .map(v => v.isRight() ? VoteJsonSerializer.instance.toJsonImpl(v.get()) : v.value);
    }

    delete(req: Request): Future<object> {
        return Future.of(() => EitherUtils.sequence(this.getVoteId(req).map(vid => this.db.procedures.delete.deleteVote(vid))))
            .flatMap(v => Future.fromPromise(v))
            .map(v => v.isRight() ? VoteJsonSerializer.instance.toJsonImpl(v.get()) : v.value);
    }

    doesRequireAuthentication = (req: Request) => true;

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

    read(req: Request): Future<object | string> {
        if (this.getVoteId(req)) {
            return Future.of(() => this.getVoteId(req).flatMap(vid => this.db.cache.votes.getByVoteId(vid)))
                .map(v => v.isRight() ? VoteJsonSerializer.instance.toJsonImpl(v.get()) : v.value);
        }
        return Future.of(() => EitherUtils.liftEither(this.db.cache.votes.getVotes(), "Vote cache is empty"))
            .map(v => v.isRight() ? VoteJsonSerializer.instance.toJsonArray(v.get().toArray()) : v.value);
    }

    update(req: Request): Future<object> {
        return Future.of(() => EitherUtils.sequence(this.validate(req).map(v => this.db.procedures.update.updateVote(v)(this.getRequestUsername(req)))))
            .flatMap(v => Future.fromPromise(v))
            .map(v => v.isRight() ? VoteJsonSerializer.instance.toJsonImpl(v.get()) : v.value);
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
