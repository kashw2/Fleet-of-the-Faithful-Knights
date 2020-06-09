import {None, Option, Some} from "funfix-core";
import {List} from "immutable";
import {parseNumber, parseString} from "../util/object-utils";
import {Group, GroupUtils} from "../util/group-utils";
import {DiscordGuildMember} from "./discord/discord-guild-member";
import {SimpleJsonSerializer} from "../misc/simple-json-serializer";
import {avatarKey, discordIdKey, discordUsernameKey, groupKey, idKey, memberSinceKey} from "../misc/json-keys";
import {JsonBuilder} from "..";

export class Candidate {

    constructor(
        readonly id: Option<number> = None,
        readonly discordId: Option<string> = None,
        readonly discordUsername: Option<string> = None,
        readonly avatar: Option<string> = None,
        readonly group: Option<Group> = None,
        readonly memberSince: Option<string> = None,
    ) {
    }

    static fromDiscordGuildMember(member: DiscordGuildMember, idx: Option<number> = None): Candidate {
        return new Candidate(
            idx,
            member.getUser().flatMap(u => u.getId()),
            member.getNickname().orElse(member.getUser().flatMap(u => u.getUsername())),
            member.getUser().flatMap(u => u.getRequestFormedAvatarUrl()),
            GroupUtils.parseGroupOption(member.getRolesSortedHierarchy().first()),
            member.getJoinedAt(),
        );
    }

    static fromDiscordGuildMembers(members: List<DiscordGuildMember>): List<Candidate> {
        return members.map((m, idx) => this.fromDiscordGuildMember(m, Some(idx)));
    }

    public getAvatar(): Option<string> {
        return this.avatar;
    }

    public getDiscordId(): Option<string> {
        return this.discordId;
    }

    public getDiscordUsername(): Option<string> {
        return this.discordUsername;
    }

    public getGroup(): Option<Group> {
        return this.group;
    }

    public getId(): Option<number> {
        return this.id;
    }

    public getMemberSince(): Option<string> {
        return this.memberSince;
    }

    public getSanitizedDiscordUsername(): Option<string> {
        return this.getDiscordUsername()
            .map(username => username.replace(/'/gm, " "));
    }

    public getSanitizedMemberSince(): Option<string> {
        return this.getMemberSince()
            .map(time => time.substring(0, 10));
    }

}

export class CandidateJsonSerializer extends SimpleJsonSerializer<Candidate> {

    static instance: CandidateJsonSerializer = new CandidateJsonSerializer();

    fromJson(json: any): Candidate {
        return new Candidate(
            parseNumber(json[idKey]),
            parseString(json[discordIdKey]),
            parseString(json[discordUsernameKey]),
            parseString(json[avatarKey]),
            GroupUtils.parseGroupOption(json[groupKey]),
            parseString(json[memberSinceKey]),
        );
    }

    toJson(value: Candidate, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getDiscordId(), discordIdKey)
            .addOptional(value.getDiscordUsername(), discordUsernameKey)
            .addOptional(value.getAvatar(), avatarKey)
            .addOptional(value.getGroup(), groupKey)
            .addOptional(value.getMemberSince(), memberSinceKey)
            .build();
    }

}
