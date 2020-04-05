import {None, Option, Some} from "funfix-core";
import {
    avatarKey,
    discriminatorKey,
    groupKey,
    idKey,
    JsonBuilder,
    localeKey,
    memberSinceKey,
    parseNumber,
    parseString,
    SimpleJsonSerializer,
    tokenKey,
    usernameKey,
} from "..";

export class User {

    constructor(
        readonly id: Option<number> = None,
        readonly username: Option<string> = None,
        readonly locale: Option<string> = Some("en-US"),
        readonly avatar: Option<string> = None,
        readonly token: Option<string> = None,
        readonly discriminator: Option<string> = None,
        readonly group: Option<string> = None,
        readonly memberSince: Option<string> = None,
    ) {
    }

    public getAvatar(): Option<string> {
        return this.avatar;
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

    public getLocale(): Option<string> {
        return this.locale;
    }

    getMemberSince(): Option<string> {
        return this.memberSince;
    }

    public getToken(): Option<string> {
        return this.token;
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
            parseString(json[localeKey]),
            parseString(json[avatarKey]),
            parseString(json[tokenKey]),
            parseString(json[discriminatorKey]),
            parseString(json[groupKey]),
            parseString(json[memberSinceKey]),
        );
    }

    toJsonImpl(value: User, builder: JsonBuilder): object {
        return builder
            .addOptional(value.getId(), idKey)
            .addOptional(value.getUsername(), usernameKey)
            .addOptional(value.getDiscriminator(), discriminatorKey)
            .addOptional(value.getAvatar(), avatarKey)
            .addOptional(value.getToken(), tokenKey)
            .addOptional(value.getLocale(), localeKey)
            .addOptional(value.getGroup(), groupKey)
            .addOptional(value.getMemberSince(), memberSinceKey)
            .build();
    }

}
