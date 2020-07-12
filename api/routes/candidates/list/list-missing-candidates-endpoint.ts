import {Request, Response} from "express";
import {Candidate, CandidateJsonSerializer} from "../../../../core/src/models/candidate";
import {Database} from "../../../db/database";
import {Either} from "funfix-core";
import {List} from "immutable";
import {PostEndpoint} from "../../../../core/src/server/post-endpoint";
import {ApiUtils, User} from "../../../../core/src";


export class ListMissingCandidatesEndpoint extends PostEndpoint {

    constructor(readonly db: Database) {
        super("/candidates/missing", db);
    }

    private getCacheCandidates(): Either<string, List<Candidate>> {
        return this.db.cache.candidates.getCandidatesEither();
    }

    private getCandidates(req: Request): Either<string, List<Candidate>> {
        return ApiUtils.parseSerializedListFromBody(req, "candidates", CandidateJsonSerializer.instance)
    }

    getEndpointName(): string {
        return "List Missing Candidates";
    }

    private getMissingCandidates(req: Request): Either<string, List<Candidate>> {
        return Either.map2(this.getCacheCandidates(), this.getCandidates(req), (cached, candidates) => {
            return candidates.toOrderedSet().subtract(cached.toOrderedSet()).toList();
        })
    }

    isAuthorized(user: User): boolean {
        return user.isDeveloper();
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getMissingCandidates(req), CandidateJsonSerializer.instance, res);
    }

}
