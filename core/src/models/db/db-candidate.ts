import {
    discordIdKey,
    discordNameKey,
    fakeIndexKey, groupIdKey,
    groupKey,
    JsonBuilder,
    memberSinceKey,
    SimpleJsonSerializer,
} from "../..";
import {DbUser} from "./db-user";
import {Candidate} from "../candidate";
import {Option} from "funfix-core";
import {List} from "immutable";
import {MiscUtil} from "../../util/misc-util";

export class DbCandidate {

    constructor(
        readonly discordId: string,
        readonly discordName: string,
        readonly group_id: number,
        readonly memberSince: string,
        readonly fakeIdx: number = 0,
    ) {
    }
    
    static fromCandidate(candidate: Candidate, index: number): Option<DbCandidate> {
        return Option.map4(
            candidate.getDiscordId(),
            candidate.getDiscordName(),
            candidate.getGroup(),
            candidate.getMemberSince(),
            (did, dn, g, ms) => {
                return new DbCandidate(
                    did,
                    dn,
                    MiscUtil.getGroupIdFromName(g),
                    ms,
                    index
                );
            },
        );
    }

    getDiscordId(): string {
        return this.discordId;
    }

    getDiscordName(): string {
        return this.discordName;
    }

    getGroupId(): number {
        return this.group_id;
    }

    getMemberSince(): string {
        return this.memberSince;
    }
    
    getFakeIndex(): number {
        return this.fakeIdx;
    }

}

export class DbCandidateJsonSerializer extends SimpleJsonSerializer<DbCandidate> {

    static instance: DbCandidateJsonSerializer = new DbCandidateJsonSerializer();

    fromJson(json: any): DbCandidate {
        throw new Error("Db classes are read only");
    }

    toJson(value: DbCandidate, builder: JsonBuilder): object {
        return builder.add(value.getDiscordId(), discordIdKey)
            .add(value.getDiscordName(), discordNameKey)
            .add(value.getGroupId(), groupIdKey)
            .add(value.getMemberSince(), memberSinceKey)
            .add(value.getFakeIndex(), fakeIndexKey)
            .build();
    }

}
