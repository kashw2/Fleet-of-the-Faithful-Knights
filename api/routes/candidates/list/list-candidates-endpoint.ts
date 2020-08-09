import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {Database} from "../../../db/database";
import {Candidate, CandidateJsonSerializer, User, ApiUtils} from "@ffk/lib-ts";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint"

export class ListCandidatesEndpoint extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/candidates", db);
    }

    private getCandidates(): Either<string, List<Candidate>> {
        return this.db.cache.candidates.getCandidatesEither();
    }

    getEndpointName(): string {
        return "List Candidates";
    }

    isAuthorized(user: User): boolean {
        return !user.isGuest();
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getCandidates(), CandidateJsonSerializer.instance, res);
    }

}
