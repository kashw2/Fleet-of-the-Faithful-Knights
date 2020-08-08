import {Either} from "funfix-core";
import {List} from "immutable";
import {IRecordSet} from "mssql";
import {
    DbCandidate,
    DbCandidateJsonSerializer,
    DbComment,
    DbVote,
    DbVoteJsonSerializer,
    DbCommentJsonSerializer,
    DbUser,
    DbUserJsonSerializer
} from "@ffk/lib-ts";
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

    insertComment(comment: DbComment, voteId: number, modifiedBy = "System"): Promise<Either<string, IRecordSet<any>>> {
        return this.requests.sendRequest(
            "ssp_InsertComment",
            List.of(
                `@Comment = '${DbCommentJsonSerializer.instance.toJsonString(comment)}'`,
                `@VoteId = ${voteId}`,
                `@ModifiedBy = ${modifiedBy}`,
            ),
        );
    }

    insertUser(user: DbUser, modifiedBy: string = "System"): Promise<Either<string, IRecordSet<any>>> {
        return this.requests.sendRequest(
            "ssp_InsertUser",
            List.of(`@User = '${DbUserJsonSerializer.instance.toJsonString(user)}'`, `@ModifiedBy = ${modifiedBy}`),
        );
    }

    insertVote(vote: DbVote, modifiedBy: string = "System"): Promise<Either<string, IRecordSet<any>>> {
        return this.requests.sendRequest(
            "ssp_InsertVote",
            List.of(`@Vote = '${DbVoteJsonSerializer.instance.toJsonString(vote)}'`, `@ModifiedBy = ${modifiedBy}`),
        );
    }

    insertVoteResponse(
        voteId: number,
        userId: number,
        response: string,
        modifiedBy: string = "System",
    ): Promise<Either<string, IRecordSet<any>>> {
        return this.requests.sendRequest(
            "ssp_InsertVoteResponse",
            List.of(`@VoteId = ${voteId}`, `@UserId = ${userId}`, `@Response = ${response}`, `@ModifiedBy = ${modifiedBy}`),
        );
    }

}
