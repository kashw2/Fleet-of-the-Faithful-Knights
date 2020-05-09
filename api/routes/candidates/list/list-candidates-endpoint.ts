import {Request, Response} from "express";
import {Either} from "funfix-core";
import {List} from "immutable";
import {ApiUtils} from "../../../../core/src";
import {Candidate, CandidateJsonSerializer} from "../../../../core/src/models/candidate";
import {GetEndpoint} from "../../../../core/src/server/get-endpoint";
import {Database} from "../../../db/database";

export class ListCandidatesEndpoint extends GetEndpoint {

    constructor(private db: Database) {
        super("/candidates");
    }

    private getCandidates(): Either<string, List<Candidate>> {
        return this.db.cache.candidates.getCandidatesEither();
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendSerializedCollectionResult(this.getCandidates(), CandidateJsonSerializer.instance, res);
    }

}
