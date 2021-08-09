import {CrudEndpoint} from "@kashw2/lib-server";
import {Candidate, CandidateJsonSerializer, User, Vote, VoteJsonSerializer} from "@kashw2/lib-ts";
import {Request, Response} from 'express';
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils} from "@kashw2/lib-util";
import {List} from "immutable";
import {Database} from "../db/database";

export class CandidateEndpoint extends CrudEndpoint {

    constructor(private db: Database) {
        super('/candidate');
    }

    doesRequireAuthentication(req: Request): boolean {
        return false;
    }

    getCandidate(req: Request): Either<string, Candidate> {
        return ApiUtils.parseBodyParamSerialized(req, 'candidate', CandidateJsonSerializer.instance);
    }

    private getCandidateId(req: Request): Either<string, string> {
        return ApiUtils.parseUrlStringParam(req, 'candidate_id');
    }

    getCandidates(req: Request): Either<string, List<Candidate>> {
        return ApiUtils.parseBodyParamSerializedList(req, 'candidates', CandidateJsonSerializer.instance);
    }

    hasPermission(req: Request, res: Response, user?: User): boolean {
        return true;
    }

    isCreatingSingle(req: Request): boolean {
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

    private validate(req: Request): Either<string, Candidate> {
        switch (this.getHTTPMethod(req)) {
            case 'PUT':
            case 'POST':
            default:
                return this.getCandidate(req);
        }
    }

}