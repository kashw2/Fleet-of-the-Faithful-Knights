import {AuthenticatedCrudEndpoint} from "@kashw2/lib-server";
import {Candidate, CandidateJsonSerializer, User} from "@kashw2/lib-ts";
import {Request, Response} from 'express';
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils} from "@kashw2/lib-util";
import {List} from "immutable";
import {Database} from "../db/database";
import {Future} from "funfix";

export class CandidateEndpoint extends AuthenticatedCrudEndpoint {

    constructor(private db: Database) {
        super('/candidate');
    }

    create(req: Request): Future<object | string> {
        if (this.isForSingle(req)) {
            return this.getCandidate(req)
                .map(v => {
                    this.db.cache.candidates.add(v);
                    return this.db.procedures.insert.insertCandidate(v)(this.getRequestUsername(req));
                })
                .getOrElse(Future.raise(`Failure running ${this.getEndpointName()}`))
                .map(v => {
                    this.db.cache.cacheCandidates();
                    return v.isRight() ? CandidateJsonSerializer.instance.toJsonImpl(v.get()) : v.value;
                });
        }
        return this.getCandidates(req)
            .map(v => {
                this.db.cache.candidates.update(v);
                return this.db.procedures.insert.insertCandidates(v)(this.getRequestUsername(req));
            })
            .getOrElse(Future.raise(`Failure running ${this.getEndpointName()}`))
            .map(v => {
                this.db.cache.cacheCandidates();
                return v.isRight() ? CandidateJsonSerializer.instance.toJsonArray(v.get().toArray()) : v.value;
            });
    }

    delete(req: Request): Future<object | string> {
        return this.getCandidateId(req)
            .map(mid => this.db.procedures.delete.deleteCandidate(mid))
            .getOrElse(Future.raise(`Failure running ${this.getEndpointName()}`))
            .map(v => v.isRight() ? CandidateJsonSerializer.instance.toJsonImpl(v.get()) : v.value);
    }

    doesRequireAuthentication(req: Request): boolean {
        switch (this.getHTTPMethod(req)) {
            case 'POST':
            case 'GET':
                return this.isForSingle(req);
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

    isForSingle(req: Request): boolean {
        return ApiUtils.parseBooleanQueryParam(req, 'single')
            .contains(true);
    }

    read(req: Request): Future<object | string> {
        if (this.getCandidateId(req).isLeft()) {
            return Future.of(() => EitherUtils.liftEither(this.db.cache.candidates.getCandidates(), "Candidates cache is empty"))
                .map(v => v.isRight() ? CandidateJsonSerializer.instance.toJsonArray(v.get().toArray()) : v.value);
        }
        return Future.of(() => this.getCandidateId(req).flatMap(cid => this.db.cache.candidates.getCandidateById(cid)))
            .map(v => v.isRight() ? CandidateJsonSerializer.instance.toJsonImpl(v.get()) : v.value);
    }

    update(req: Request): Future<object | string> {
        return Either.map2(
            this.validate(req),
            this.getCandidateId(req),
            (c, cid) => this.db.procedures.update.updateCandidate(c, cid)(this.getRequestUsername(req))
        )
            .getOrElse(Future.raise(`Failure running ${this.getEndpointName()}`))
            .map(v => v.isRight() ? CandidateJsonSerializer.instance.toJsonImpl(v.get()) : v.value);
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