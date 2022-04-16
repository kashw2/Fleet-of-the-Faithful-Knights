import {AuthenticatedCrudEndpoint} from "@kashw2/lib-server";
import {Candidate, CandidateJsonSerializer, User} from "@kashw2/lib-ts";
import {Request, Response} from 'express';
import {Either} from "funfix";
import {ApiUtils, EitherUtils} from "@kashw2/lib-util";
import {List} from "immutable";
import {Database} from "../db/database";

export class CandidateEndpoint extends AuthenticatedCrudEndpoint {

    constructor(private db: Database) {
        super('/candidate');
    }

    create(req: Request): Promise<Either<string, any>> {
        if (this.isForSingle(req)) {
            return EitherUtils.sequence(
                this.getCandidate(req)
                    .map(c => {
                        this.db.cache.candidates.add(c);
                        return this.db.procedures.insert.insertCandidate(c)(this.getRequestUsername(req));
                    })
            ).then(v => {
                // Caching bug
                this.db.cache.cacheCandidates();
                return v.map(x => CandidateJsonSerializer.instance.toJsonImpl(x));
            });
        }
        return EitherUtils.sequence(
            this.getCandidates(req)
                .map(c => {
                    this.db.cache.candidates.update(c);
                    return this.db.procedures.insert.insertCandidates(c)(this.getRequestUsername(req));
                })
        ).then(v => {
            // Caching bug
            this.db.cache.cacheCandidates();
            return v.map(x => CandidateJsonSerializer.instance.toJsonArray(x.toArray()));
        });
    }

    delete(req: Request): Promise<Either<string, any>> {
        return EitherUtils.sequence(this.getCandidateId(req)
            .map(cid => this.db.procedures.delete.deleteCandidate(cid)))
            .then(v => v.map(x => CandidateJsonSerializer.instance.toJsonImpl(x)));
    }

    doesRequireAuthentication(req: Request): boolean {
        switch (this.getHTTPMethod(req)) {
            case 'POST':
            case 'GET':
                if (this.isForSingle(req)) {
                    return true;
                }
                return false;
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

    read(req: Request): Promise<Either<string, any>> {
        if (this.getCandidateId(req).isLeft()) {
            return Promise.resolve(EitherUtils.liftEither(CandidateJsonSerializer.instance.toJsonArray(this.db.cache.candidates.getCandidates().toArray()), "Candidates cache is empty"));
        }
        return Promise.resolve(this.getCandidateId(req)
            .flatMap(cid => this.db.cache.candidates.getCandidateById(cid)))
            .then(v => v.map(x => CandidateJsonSerializer.instance.toJsonImpl(x)));
    }

    update(req: Request): Promise<Either<string, any>> {
        return EitherUtils.sequence(Either.map2(
            this.getCandidate(req),
            this.getCandidateId(req),
            (candidate, cid) => EitherUtils.sequence(this.validate(req)
                .map(c => {
                    return this.db.procedures.update.updateCandidate(c, cid)(this.getRequestUsername(req));
                })
            )));
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