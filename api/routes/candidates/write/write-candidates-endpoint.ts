import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {ApiUtils, EitherUtils, OptionUtils, User} from "../../../../core/src";
import {Candidate, CandidateJsonSerializer} from "../../../../core/src/models/candidate";
import {DbCandidate} from "../../../../core/src/models/db/db-candidate";
import {PostEndpoint} from "../../../../core/src/server/post-endpoint";
import {Database} from "../../../db/database";

export class WriteCandidatesEndpoint extends PostEndpoint {

    constructor(readonly db: Database) {
        super("/candidates/write", db);
    }

    private getCandidates(req: Request): Either<string, List<Candidate>> {
        return ApiUtils.parseSerializedListFromBody(req, "candidates", CandidateJsonSerializer.instance);
    }

    getEndpointName(): string {
        return "Write Candidates";
    }

    isAuthorized(user: User): boolean {
        return user.isDeveloper();
    }

    run(req: Request, res: Response): void {
        const dbCandidates = OptionUtils.flattenList(EitherUtils.toList(this.getCandidates(req))
            .map((c, idx) => DbCandidate.fromCandidate(c, idx)));
        ApiUtils.sendResultPromiseEffector(this.db.procedures.insert.insertCandidates(dbCandidates), res, (x) => ({id: x}));
        this.db.cache.cacheUsers();
    }

}
