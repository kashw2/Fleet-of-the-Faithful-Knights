import {None, Option, Some} from "funfix-core";
import {
    avatarKey,
    discordIdKey,
    discriminatorKey,
    groupKey,
    idKey,
    localeKey,
    memberSinceKey,
    permissionsKey,
    tokenKey,
    usernameKey
} from "../misc/json-keys";
import {parseNumber, parseSerializedList, parseString} from "../util/object-utils";
import {JsonBuilder} from "../misc/json-builder";
import {SimpleJsonSerializer} from "../misc/simple-json-serializer";
import {List} from "immutable";
import {Permission, PermissionJsonSerializer} from "./permission";


export class User {

    constructor(
        readonly id: Option<number> = None,
        readonly discordId: Option<string> = None,
        readonly discriminator: Option<string> = None,
        readonly username: Option<string> = None,
        readonly locale: Option<string> = Some("en-US"),
        readonly avatar: Option<string> = None,
        readonly token: Option<string> = None,
        readonly group: Option<string> = None,
        readonly permissions: List<Permission> = List(),
        readonly memberSince: Option<string> = None,
    ) {
    }

    public static withoutToken(user: User): User {
        return new User(
            user.getId(),
            user.getDiscordId(),
            user.getDiscriminator(),
            user.getUsername(),
            user.getLocale(),
            user.getAvatar(),
            None,
            user.getGroup(),
            user.getPermissions(),
            user.getMemberSince(),
        );
    }

    public getAvatar(): Option<string> {
        return this.avatar;
    }

    public getDiscordId(): Option<string> {
        return this.discordId;
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

    public getMemberSince(): Option<string> {
        return this.memberSince;
    }

    public getPermissions(): List<Permission> {
        return this.permissions;
    }

    public getToken(): Option<string> {
        return this.token;
    }

    public getUsername(): Option<string> {
        return this.username;
    }

    public hasAllPermissions(...permissions: number[]): boolean {
        return permissions.every(p => this.hasPermission(p));
    }

    public hasOneOfPermissions(...permissions: number[]): boolean {
        return permissions.some(p => this.hasPermission(p));
    }

    public hasPermission(permission: number): boolean {
        return this.getPermissions()
            .every(p => p.getId().contains(permission));
    }

    public isCompanionAtArms(): boolean {
        return this.getGroup()
            .contains("Companion at Arms");
    }

    public isDeveloper(): boolean {
        return this.getGroup()
            .contains("Developer");
    }

    public isEmpty(): boolean {
        return this.getId().isEmpty()
            && this.getDiscordId().isEmpty()
            && this.getUsername().isEmpty()
            && this.getLocale().isEmpty()
            && this.getAvatar().isEmpty()
            && this.getToken().isEmpty()
            && this.getDiscriminator().isEmpty()
            && this.getGroup().isEmpty()
            && this.getMemberSince().isEmpty();
    }

    public isGrandMaster(): boolean {
        return this.getGroup()
            .contains("Grand Master");
    }

    public isGuest(): boolean {
        return !this.isDeveloper()
            && !this.isGrandMaster()
            && !this.isMasterCommander()
            && !this.isKnightCommander()
            && !this.isKnightLieutenant()
            && !this.isKnight()
            && !this.isSergeantFirstClass()
            && !this.isSergeant()
            && !this.isSquire()
            && !this.isCompanionAtArms();
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

    public isMasterCommander(): boolean {
        return this.getGroup()
            .contains("Master Commander");
    }

    public isSergeant(): boolean {
        return this.getGroup()
            .contains("Sergeant");
    }

    public isSergeantFirstClass(): boolean {
        return this.getGroup()
            .contains("Sergeant First Class");
    }

    public isSquire(): boolean {
        return this.getGroup()
            .contains("Squire");
    }

}

export class UserJsonSerializer extends SimpleJsonSerializer<User> {

    static instance: UserJsonSerializer = new UserJsonSerializer();

    fromJson(json: any): User {
        return new User(
            parseNumber(json[idKey]),
            parseString(json[discordIdKey]),
            parseString(json[discriminatorKey]),
            parseString(json[usernameKey]),
            parseString(json[localeKey]),
            parseString(json[avatarKey]),
            parseString(json[tokenKey]),
            parseString(json[groupKey]),
            parseSerializedList(json[permissionsKey], PermissionJsonSerializer.instance),
            parseString(json[memberSinceKey]),
        );
    }

    toJson(value: User, builder: JsonBuilder): object {
        return builder
            .addOptional(value.getId(), idKey)
            .addOptional(value.getDiscordId(), discordIdKey)
            .addOptional(value.getDiscriminator(), discriminatorKey)
            .addOptional(value.getUsername(), usernameKey)
            .addOptional(value.getAvatar(), avatarKey)
            .addOptional(value.getToken(), tokenKey)
            .addOptional(value.getLocale(), localeKey)
            .addOptional(value.getGroup(), groupKey)
            .addListSerialized(value.getPermissions(), permissionsKey, PermissionJsonSerializer.instance)
            .addOptional(value.getMemberSince(), memberSinceKey)
            .build();
    }

}
