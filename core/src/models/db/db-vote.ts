import {Option} from "funfix-core";
import {candidateKey, groupIdKey, idKey, JsonBuilder, notesKey, SimpleJsonSerializer, sponsorIdKey} from "../..";
import {GroupUtils} from "../../util/group-utils";
import {Vote} from "../vote";
import {DbUser} from "./db-user";

export class DbVote {

    constructor(
        private sponsorId: number,
        private candidateName: string,
        private groupId: number,
        private notes: string = "",
    ) {
    }

    static fromVote(vote: Vote): Option<DbVote> {
        return Option.map4(
            vote.getSponsorId(),
            vote.getCandidateName(),
            vote.getGroup(),
            vote.getNotes(),
            (sid, candidate, group, notes) => {
                return new DbVote(
                    sid,
                    candidate,
                    GroupUtils.getGroupIdFromName(GroupUtils.parseGroup(group)),
                    notes,
                );
            });
    }

    getCandidate(): string {
        return this.candidateName;
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
