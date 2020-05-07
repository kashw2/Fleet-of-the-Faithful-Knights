import {None, Option} from "funfix-core";
import {List} from "immutable";
import {
    discordIdKey,
    discordNameKey,
    groupKey,
    idKey,
    JsonBuilder,
    memberSinceKey,
    parseNumber,
    parseString,
    SimpleJsonSerializer,
} from "..";
import {Group, MiscUtil} from "../util/misc-util";
import {DiscordGuildMember} from "./discord/discord-guild-member";

export class Candidate {

    constructor(
        readonly id: Option<number> = None,
        readonly discordId: Option<string> = None,
        readonly discordName: Option<string> = None,
        readonly group: Option<Group> = None,
        readonly memberSince: Option<string> = None,
    ) {
    }

    static fromDiscordGuildMember(member: DiscordGuildMember): Candidate {
        return new Candidate(
            None,
            member.getUser().flatMap(u => u.getId()),
            member.getUser().flatMap(u => u.getUsername()),
            MiscUtil.parseGroupOption(member.getRoles().first()),
            None,
        );
    }

    static fromDiscordGuildMembers(members: List<DiscordGuildMember>): List<Candidate> {
        return members.map(m => this.fromDiscordGuildMember(m));
    }

    public getDiscordId(): Option<string> {
        return this.discordId;
    }

    public getDiscordName(): Option<string> {
        return this.discordName;
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

}

export class CandidateJsonSerializer extends SimpleJsonSerializer<Candidate> {

    static instance: CandidateJsonSerializer = new CandidateJsonSerializer();

    fromJson(json: any): Candidate {
        return new Candidate(
            parseNumber(json[idKey]),
            parseString(json[discordIdKey]),
            parseString(json[discordNameKey]),
            MiscUtil.parseGroupOption(json[groupKey]),
            parseString(json[memberSinceKey]),
        );
    }

    toJson(value: Candidate, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getDiscordId(), discordIdKey)
            .addOptional(value.getDiscordName(), discordNameKey)
            .addOptional(value.getGroup(), groupKey)
            .addOptional(value.getMemberSince(), memberSinceKey)
            .build();
    }

}
