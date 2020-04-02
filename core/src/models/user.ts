import {None, Option} from "funfix-core";
import {
    discriminatorKey,
    groupKey,
    idKey,
    JsonBuilder,
    parseNumber,
    parseString,
    SimpleJsonSerializer,
    usernameKey,
} from "..";
import {MiscUtil} from "../util/misc-util";
import {DiscordGuildMember} from "./discord/discord-guild-member";

export class User {

    constructor(
        readonly id: Option<number> = None,
        readonly username: Option<string> = None,
        readonly discriminator: Option<string> = None,
        readonly group: Option<string> = None,
    ) {
    }

    public getDiscriminator(): Option<string> {
        return this.discriminator;
    }

    public getGroup(): Option<string> {
        return this.group;
    }

    public getId(): Option<number> {
        return this.id;
    }

    public getUsername(): Option<string> {
        return this.username;
    }

    public isDeveloper(): boolean {
        return this.getGroup()
            .contains("Developer");
    }

    public isGrandMaster(): boolean {
        return this.getGroup()
            .contains("Grand Master");
    }

    public isKnight(): boolean {
        return this.getGroup()
            .contains("Knight");
    }

    public isKnightCommander(): boolean {
        return this.getGroup()
            .contains("Knight Commander");
    }

    public isKnightLieutenant(): boolean {
        return this.getGroup()
            .contains("Knight Lieutenant");
    }

    public isSergeant(): boolean {
        return this.getGroup()
            .contains("Sergeant");
    }

    public isSergeantFirstClass(): boolean {
        return this.getGroup()
            .contains("Sergeant First Class");
    }

}

export class UserJsonSerializer extends SimpleJsonSerializer<User> {

    static instance: UserJsonSerializer = new UserJsonSerializer();

    fromJson(json: any): User {
        return new User(
            parseNumber(json[idKey]),
            parseString(json[usernameKey]),
            parseString(json[discriminatorKey]),
            parseString(json[groupKey]),
        );
    }

    toJsonImpl(value: User, builder: JsonBuilder): object {
        return builder
            .addOptional(value.getId(), idKey)
            .addOptional(value.getUsername(), usernameKey)
            .addOptional(value.getDiscriminator(), discriminatorKey)
            .addOptional(value.getGroup(), groupKey)
            .build();
    }

}
