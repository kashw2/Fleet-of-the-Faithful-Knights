import {Option} from "funfix-core";
import {
    discordIdKey,
    discordUsernameKey,
    fakeIndexKey,
    groupIdKey,
    idKey,
    JsonBuilder,
    memberSinceKey,
    SimpleJsonSerializer,
} from "../..";
import {GroupUtils} from "../../util/group-utils";
import {Candidate} from "../candidate";

export class DbCandidate {

    constructor(
        readonly id: number,
        readonly discordId: string,
        readonly discordUsername: string,
        readonly groupId: number,
        readonly memberSince: string,
        readonly fakeIdx: number = 0,
    ) {
    }

    static fromCandidate(candidate: Candidate, index: number): Option<DbCandidate> {
        return Option.map5(
            candidate.getId(),
            candidate.getDiscordId(),
            candidate.getSanitizedDiscordUsername(),
            candidate.getGroup(),
            candidate.getSanitizedMemberSince(),
            (id, did, dn, g, ms) => {
                return new DbCandidate(
                    id,
                    did,
                    dn,
                    GroupUtils.getGroupIdFromName(g),
                    ms,
                    index,
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

    getFakeIndex(): number {
        return this.fakeIdx;
    }

    getGroupId(): number {
        return this.groupId;
    }

    getId(): number {
        return this.id;
    }

    getMemberSince(): string {
        return this.memberSince;
    }

}

export class DbCandidateJsonSerializer extends SimpleJsonSerializer<DbCandidate> {

    static instance: DbCandidateJsonSerializer = new DbCandidateJsonSerializer();

    fromJson(json: any): DbCandidate {
        throw new Error("Db classes are read only");
    }

    toJson(value: DbCandidate, builder: JsonBuilder): object {
        return builder.add(value.getId(), idKey)
            .add(value.getDiscordId(), discordIdKey)
            .add(value.getDiscordUsername(), discordUsernameKey)
            .add(value.getGroupId(), groupIdKey)
            .add(value.getMemberSince(), memberSinceKey)
            .add(value.getFakeIndex(), fakeIndexKey)
            .build();
    }

}
