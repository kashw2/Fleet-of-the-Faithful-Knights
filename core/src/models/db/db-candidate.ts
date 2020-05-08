import {
    discordIdKey,
    discordUsernameKey,
    fakeIndexKey,
    groupIdKey,
    JsonBuilder,
    memberSinceKey,
    SimpleJsonSerializer,
} from "../..";
import {Candidate} from "../candidate";
import {Option} from "funfix-core";
import {MiscUtil} from "../../util/misc-util";

export class DbCandidate {

    constructor(
        readonly discordId: string,
        readonly discordUsername: string,
        readonly group_id: number,
        readonly memberSince: string,
        readonly fakeIdx: number = 0,
    ) {
    }
    
    static fromCandidate(candidate: Candidate, index: number): Option<DbCandidate> {
        return Option.map4(
            candidate.getDiscordId(),
            candidate.getSanitizedDiscordUsername(),
            candidate.getGroup(),
            candidate.getSanitizedMemberSince(),
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

    getDiscordUsername(): string {
        return this.discordUsername;
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
            .add(value.getDiscordUsername(), discordUsernameKey)
            .add(value.getGroupId(), groupIdKey)
            .add(value.getMemberSince(), memberSinceKey)
            .add(value.getFakeIndex(), fakeIndexKey)
            .build();
    }

}
