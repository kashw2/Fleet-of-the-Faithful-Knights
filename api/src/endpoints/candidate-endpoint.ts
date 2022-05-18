import {AuthenticatedCrudEndpoint} from "@kashw2/lib-server";
import {Candidate, CandidateJsonSerializer, User} from "@kashw2/lib-ts";
import {Request, Response} from 'express';
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils, FutureUtils} from "@kashw2/lib-util";
import {List} from "immutable";
import {Database} from "../db/database";
import {Future} from "funfix";

export class CandidateEndpoint extends AuthenticatedCrudEndpoint {

  constructor(private db: Database) {
    super('/candidate');
  }

  create(req: Request): Future<object> {
    if (this.getCandidateId(req).isRight()) {
      return EitherUtils.sequenceFuture(this.getCandidate(req)
        .map(v => {
          this.db.cache.updateCandidates(this.db.cache.candidates.add(v));
          return this.db.procedures.insert.insertCandidate(v)(this.getRequestUsername(req));
        }))
        .flatMap(FutureUtils.fromEither)
        .map(v => CandidateJsonSerializer.instance.toJsonImpl(v));
    }
    return EitherUtils.sequenceFuture(this.getCandidates(req)
      .map(v => {
        this.db.cache.updateCandidates(this.db.cache.candidates.update(v));
        return this.db.procedures.insert.insertCandidates(v)(this.getRequestUsername(req));
      }))
      .flatMap(FutureUtils.fromEither)
      .map(v => CandidateJsonSerializer.instance.toJsonArray(v.toArray()));
  }

  delete(req: Request): Future<object> {
    return EitherUtils.sequenceFuture(this.getCandidateId(req)
      .map(cid => {
        this.db.cache.updateCandidates(this.db.cache.candidates.removeIn(c => c.getId().contains(cid)));
        return this.db.procedures.delete.deleteCandidate(cid);
      }))
      .flatMap(FutureUtils.fromEither)
      .map(v => CandidateJsonSerializer.instance.toJsonImpl(v));
  }

  doesRequireAuthentication(req: Request): boolean {
    switch (this.getHTTPMethod(req)) {
      case 'POST':
      case 'GET':
        return this.getCandidateId(req)
          .isRight();
      default:
        return true;
    }
  }

  getCandidate(req: Request): Either<string, Candidate> {
    return ApiUtils.parseBodyParamSerialized(req, 'candidate', CandidateJsonSerializer.instance);
  }

  private getCandidateId(req: Request): Either<string, string> {
    return ApiUtils.parseStringQueryParam(req, 'candidate_id');
  }

  getCandidates(req: Request): Either<string, List<Candidate>> {
    return ApiUtils.parseBodyParamSerializedList(req, 'candidates', CandidateJsonSerializer.instance);
  }

  hasPermission(req: Request, res: Response, user?: User): boolean {
    return true;
  }

  read(req: Request): Future<object> {
    if (this.getCandidateId(req).isLeft()) {
      return Future.of(() => EitherUtils.liftEither(this.db.cache.candidates.getCandidates(), "Candidates cache is empty"))
        .flatMap(FutureUtils.fromEither)
        .map(v => CandidateJsonSerializer.instance.toJsonArray(v.toArray()));
    }
    return Future.of(() => this.getCandidateId(req).flatMap(cid => this.db.cache.candidates.getCandidateById(cid)))
      .flatMap(FutureUtils.fromEither)
      .map(v => CandidateJsonSerializer.instance.toJsonImpl(v));
  }

  update(req: Request): Future<object> {
    return EitherUtils.sequenceFuture(Either.map2(
      this.validate(req),
      this.getCandidateId(req),
      (c, cid) => {
        this.db.cache.updateCandidates(this.db.cache.candidates.setIn(c, v => v.getId().contains(cid)));
        return this.db.procedures.update.updateCandidate(c, cid)(this.getRequestUsername(req));
      }
    ))
      .flatMap(FutureUtils.fromEither)
      .map(v => CandidateJsonSerializer.instance.toJsonImpl(v));
  }

  private validate(req: Request): Either<string, Candidate> {
    switch (this.getHTTPMethod(req)) {
      case 'PUT':
      case 'POST':
      default:
        return this.getCandidate(req);
    }
  }

}