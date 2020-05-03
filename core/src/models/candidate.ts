import {None, Option} from "funfix-core";
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

export class Candidate {

    constructor(
        readonly id: Option<number> = None,
        readonly discordId: Option<number> = None,
        readonly discordName: Option<string> = None,
        readonly group: Option<Group> = None,
        readonly memberSince: Option<string> = None,
    ) {
    }

    public getDiscordId(): Option<number> {
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
            parseNumber(json[discordIdKey]),
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
