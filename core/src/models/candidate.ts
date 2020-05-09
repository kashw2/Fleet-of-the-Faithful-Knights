import {None, Option} from "funfix-core";
import {List} from "immutable";
import {
    discordIdKey,
    discordUsernameKey,
    groupKey,
    idKey,
    JsonBuilder,
    memberSinceKey,
    parseNumber,
    parseString,
    SimpleJsonSerializer,
} from "..";
import {Group, GroupUtils} from "../util/group-utils";
import {DiscordGuildMember} from "./discord/discord-guild-member";

export class Candidate {

    constructor(
        readonly id: Option<number> = None,
        readonly discordId: Option<string> = None,
        readonly discordUsername: Option<string> = None,
        readonly group: Option<Group> = None,
        readonly memberSince: Option<string> = None,
    ) {
    }

    static fromDiscordGuildMember(member: DiscordGuildMember): Candidate {
        return new Candidate(
            None,
            member.getUser().flatMap(u => u.getId()),
            member.getUser().flatMap(u => u.getUsername()),
            GroupUtils.parseGroupOption(member.getRolesSortedHierarchy().first()),
            member.getJoinedAt(),
        );
    }

    static fromDiscordGuildMembers(members: List<DiscordGuildMember>): List<Candidate> {
        return members.map(m => this.fromDiscordGuildMember(m));
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
            GroupUtils.parseGroupOption(json[groupKey]),
            parseString(json[memberSinceKey]),
        );
    }

    toJson(value: Candidate, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getDiscordId(), discordIdKey)
            .addOptional(value.getDiscordUsername(), discordUsernameKey)
            .addOptional(value.getGroup(), groupKey)
            .addOptional(value.getMemberSince(), memberSinceKey)
            .build();
    }

}
