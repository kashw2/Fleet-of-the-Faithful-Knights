import {AuthenticatedCrudEndpoint} from "@kashw2/lib-server";
import {Database} from "../db/database";
import {User, Vote, VoteJsonSerializer} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils, FutureUtils} from "@kashw2/lib-util";
import {Future} from "funfix";

export class VotesEndpoint extends AuthenticatedCrudEndpoint {

  constructor(private db: Database) {
    super('/vote');
  }

  create(req: Request): Future<object> {
    return FutureUtils.fromEither(this.validate(req))
      .flatMap(v => {
        this.db.cache.updateVotes(cache => cache.add(v));
        return this.db.procedures.insert.insertVote(v)(this.getRequestUsername(req));
      })
      .flatMap(FutureUtils.fromEither)
      .map(v => VoteJsonSerializer.instance.toJsonImpl(v));
  }

  delete(req: Request): Future<object> {
    return FutureUtils.fromEither(this.getVoteId(req))
      .flatMap(vid => {
        this.db.cache.updateVotes(cache => cache.removeIn(v => v.getId().contains(vid)));
        return this.db.procedures.delete.deleteVote(vid);
      })
      .flatMap(FutureUtils.fromEither)
      .map(v => VoteJsonSerializer.instance.toJsonImpl(v));
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

  read(req: Request): Future<object> {
    if (this.getVoteId(req).isLeft()) {
      return FutureUtils.fromEither(EitherUtils.lift(this.db.cache.votes.getVotes(), "Vote cache is empty"))
        .map(v => VoteJsonSerializer.instance.toJsonArray(v.toArray()));
    }
    return FutureUtils.fromEither(this.getVoteId(req))
      .map(vid => this.db.cache.votes.getByVoteId(vid))
      .flatMap(FutureUtils.fromEither)
      .map(v => VoteJsonSerializer.instance.toJsonImpl(v));
  }

  update(req: Request): Future<object> {
    return FutureUtils.fromEither(this.validate(req))
      .flatMap(v => {
        this.db.cache.updateVotes(cache => cache.setIn(v, x => x.getId().equals(v.getId())));
        return this.db.procedures.update.updateVote(v)(this.getRequestUsername(req));
      })
      .flatMap(FutureUtils.fromEither)
      .map(v => VoteJsonSerializer.instance.toJsonImpl(v));
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
