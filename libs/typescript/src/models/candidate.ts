import {JsonBuilder, JsonSerializer, parseString} from '@kashw2/lib-util';
import {None, Option} from 'funfix-core';
import {
    avatarKey,
    discordDiscriminatorKey,
    discordIdKey,
    discordUsernameKey,
    groupKey,
    idKey,
    starCitizenUserKey
} from '../misc/json-keys';
import {Group, GroupJsonSerializer} from './group';
import {StarCitizenUser, StarCitizenUserJsonSerializer} from '@kashw2/lib-external';

export class Candidate {

    constructor(
        private id: Option<string> = None,
        private discordUsername: Option<string> = None,
        private discordId: Option<string> = None,
        private discordDiscriminator: Option<string> = None,
        private discordAvatar: Option<string> = None,
        private group: Option<Group> = None,
        private starCitizenUser: Option<StarCitizenUser> = None,
    ) {
    }

    public getDiscordAvatar(): Option<string> {
        return this.discordAvatar;
    }

    public getDiscordDiscriminator(): Option<string> {
        return this.discordDiscriminator;
    }

    public getDiscordId(): Option<string> {
        return this.discordId;
    }

    public getDiscordUsername(): Option<string> {
        return this.discordUsername;
    }

    public getFormedDiscordAvatar(): Option<string> {
        return Option.map2(
            this.getDiscordId(),
            this.getDiscordAvatar(),
            (did, avatar) => `https://cdn.discordapp.com/avatars/${did}/${avatar}.png`
        );
    }

    public getGroup(): Option<Group> {
        return this.group;
    }

    public getId(): Option<string> {
        return this.id;
    }

    public getStarCitizenUser(): Option<StarCitizenUser> {
        return this.starCitizenUser;
    }

}

export class CandidateJsonSerializer extends JsonSerializer<Candidate> {

    static instance: CandidateJsonSerializer = new CandidateJsonSerializer();

    fromJson(json: any): Candidate {
        return new Candidate(
            parseString(json[idKey]),
            parseString(json[discordUsernameKey]),
            parseString(json[discordIdKey]),
            parseString(json[discordDiscriminatorKey]),
            parseString(json[avatarKey]),
            GroupJsonSerializer.instance.fromJsonImpl(json[groupKey]),
            StarCitizenUserJsonSerializer.instance.fromJsonImpl(json[starCitizenUserKey]),
        );
    }

    toJson(value: Candidate, builder: JsonBuilder): Record<string, any> {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getDiscordUsername(), discordUsernameKey)
            .addOptional(value.getDiscordId(), discordIdKey)
            .addOptional(value.getDiscordDiscriminator(), discordDiscriminatorKey)
            .addOptional(value.getDiscordAvatar(), avatarKey)
            .addOptionalSerialized(value.getGroup(), groupKey, GroupJsonSerializer.instance)
            .addOptionalSerialized(value.getStarCitizenUser(), starCitizenUserKey, StarCitizenUserJsonSerializer.instance)
            .build();
    }

}
