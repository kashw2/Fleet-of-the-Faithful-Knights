import {Either} from "funfix-core";
import {List} from "immutable";
import {IRecordSet} from "mssql";
import {DbCandidate, DbCandidateJsonSerializer} from "../../../core/src/models/db/db-candidate";
import {DbUser, DbUserJsonSerializer} from "../../../core/src/models/db/db-user";
import {DbVote, DbVoteJsonSerializer} from "../../../core/src/models/db/db-vote";
import {DbRequest} from "../db-request";

export class DbInsert {

    constructor(readonly requests: DbRequest) {
    }

    insertCandidates(candidates: List<DbCandidate>, modifiedBy: string = "System"): Promise<Either<string, List<any>>> {
        return this.requests.sendRequestList(
            "ssp_InsertCandidates",
            List.of(`@Candidates = '${DbCandidateJsonSerializer.instance.toJsonArrayString(candidates)}'`, `@ModifiedBy = ${modifiedBy}`),
        );
    }

    insertUser(user: DbUser, modifiedBy: string = "System"): Promise<Either<string, IRecordSet<any>>> {
        return this.requests.sendRequest("ssp_InsertUser", List.of(`@User = '${DbUserJsonSerializer.instance.toJsonString(user)}'`, `@ModifiedBy = ${modifiedBy}`));
    }

    insertVote(vote: DbVote, modifiedBy: string = "System"): Promise<Either<string, IRecordSet<any>>> {
        return this.requests.sendRequest("ssp_InsertVote", List.of(`@Vote = '${DbVoteJsonSerializer.instance.toJsonString(vote)}'`, `@ModifiedBy = ${modifiedBy}`));
    }

}
