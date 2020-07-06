import {Option} from "funfix-core";
import {candidateKey, groupIdKey, JsonBuilder, notesKey, SimpleJsonSerializer, sponsorIdKey} from "../..";
import {GroupUtils} from "../../util/group-utils";
import {Vote} from "../vote";
import {DbCandidate, DbCandidateJsonSerializer} from "./db-candidate";

export class DbVote {

    constructor(
        readonly sponsorId: number,
        readonly candidate: DbCandidate,
        readonly groupId: number,
        readonly notes: string = "",
    ) {
    }

    static fromVote(vote: Vote): Option<DbVote> {
        return Option.map4(
            vote.getSponsorId(),
            vote.getCandidate(),
            vote.getGroup(),
            vote.getNotes(),
            (sid, candidate, group, notes) => {
                return new DbVote(
                    sid,
                    DbCandidate.fromCandidate(candidate, 0).get(),
                    GroupUtils.getGroupIdFromName(GroupUtils.parseGroup(group)),
                    notes,
                );
            });
    }

    getCandidate(): DbCandidate {
        return this.candidate;
    }

    getGroupId(): number {
        return this.groupId;
    }

    getNotes(): string {
        return this.notes;
    }

    getSponsorId(): number {
        return this.sponsorId;
    }

}

export class DbVoteJsonSerializer extends SimpleJsonSerializer<DbVote> {

    static instance: DbVoteJsonSerializer = new DbVoteJsonSerializer();

    fromJson(json: any): DbVote {
        throw new Error("Db classes are read only");
    }

    toJson(value: DbVote, builder: JsonBuilder): object {
        return builder.add(value.getSponsorId(), sponsorIdKey)
            .add(value.getCandidate(), candidateKey)
            .add(value.getGroupId(), groupIdKey)
            .add(value.getNotes(), notesKey)
            .build();
    }

}
