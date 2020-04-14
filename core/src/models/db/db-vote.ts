import {Option} from "funfix-core";
import {candidateKey, groupIdKey, idKey, JsonBuilder, notesKey, SimpleJsonSerializer, sponsorIdKey} from "../..";
import {MiscUtil} from "../../util/misc-util";
import {Vote} from "../vote";
import {DbUser} from "./db-user";

export class DbVote {

    constructor(
        private sponsorId: number,
        private candidate: string,
        private groupId: number,
        private notes: string = "",
    ) {
    }

    static fromVote(vote: Vote): Option<DbVote> {
        return Option.map4(vote.getSponsorId(), vote.getCandidate(), vote.getGroup(), vote.getNotes(), (sid, c, g, n) => {
            return new DbVote(
                sid,
                c,
                MiscUtil.getGroupIdFromName(MiscUtil.parseGroup(g)),
                n,
            );
        });
    }

    getCandidate(): string {
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
