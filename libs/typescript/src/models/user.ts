import {Set} from 'immutable';
import * as moment from 'moment';
import {JsonBuilder, JsonSerializer, OptionUtils, parseDate, parseString} from '@kashw2/lib-util';
import {None, Option} from 'funfix-core';
import {
    avatarKey,
    discordDiscriminatorKey,
    discordIdKey,
    groupKey,
    idKey,
    localeKey,
    memberSinceKey,
    permissionsKey,
    starCitizenUserKey,
    usernameKey
} from '../misc/json-keys';
import {Group, GroupJsonSerializer} from './group';
import {StarCitizenUser, StarCitizenUserJsonSerializer} from '@kashw2/lib-external';
import {Permission, PermissionJsonSerializer} from "./permission";

export class User {

    constructor(
        private id: Option<string> = None,
        private username: Option<string> = None,
        private locale: Option<string> = None,
        private avatar: Option<string> = None,
        private discordId: Option<string> = None,
        private discordDiscriminator: Option<string> = None,
        private group: Option<Group> = None,
        private permissions: Set<Permission> = Set(),
        private memberSince: Option<moment.Moment> = None,
        private starCitizenUser: Option<StarCitizenUser> = None,
    ) {
    }

    public getAvatar(): Option<string> {
        return this.avatar;
    }

    public getDiscordDiscriminator(): Option<string> {
        return this.discordDiscriminator;
    }

    public getDiscordId(): Option<string> {
        return this.discordId;
    }

    public getGroup(): Option<Group> {
        return this.group;
    }

    public getId(): Option<string> {
        return this.id;
    }

    public getLocale(): Option<string> {
        return this.locale;
    }

    public getMemberSince(): Option<moment.Moment> {
        return this.memberSince;
    }

    public getPermissionIds(): Set<string> {
        return OptionUtils.flattenSet(this.getPermissions()
            .map(p => p.getId()));
    }

    public getPermissions(): Set<Permission> {
        return this.permissions;
    }

    public getStarCitizenUser(): Option<StarCitizenUser> {
        return this.starCitizenUser;
    }

    public getUsername(): Option<string> {
        return this.username;
    }

    public hasAllPermissions(...permissionIds: string[]): boolean {
        return permissionIds.every(pid => this.getPermissionIds().contains(pid));
    }

    public hasOneOfPermissions(...permissionIds: string[]): boolean {
        return permissionIds.some(pid => this.getPermissionIds().contains(pid));
    }

}

export class UserJsonSerializer extends JsonSerializer<User> {

    static instance: UserJsonSerializer = new UserJsonSerializer();

    fromJson(json: any): User {
        return new User(
            parseString(json[idKey]),
            parseString(json[usernameKey]),
            parseString(json[localeKey]),
            parseString(json[avatarKey]),
            parseString(json[discordIdKey]),
            parseString(json[discordDiscriminatorKey]),
            GroupJsonSerializer.instance.fromJsonImpl(json[groupKey]),
            PermissionJsonSerializer.instance.fromJsonArray(json[permissionsKey]).toSet(),
            parseDate(json[memberSinceKey]),
            StarCitizenUserJsonSerializer.instance.fromJsonImpl(json[starCitizenUserKey]),
        );
    }

    toJson(value: User, builder: JsonBuilder): Record<string, any> {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getUsername(), usernameKey)
            .addOptional(value.getLocale(), localeKey)
            .addOptional(value.getAvatar(), avatarKey)
            .addOptional(value.getDiscordId(), discordIdKey)
            .addOptional(value.getDiscordDiscriminator(), discordDiscriminatorKey)
            .addOptionalSerialized(value.getGroup(), groupKey, GroupJsonSerializer.instance)
            .addIterableSerialized(value.getPermissions(), permissionsKey, PermissionJsonSerializer.instance)
            .addOptionalDate(value.getMemberSince(), memberSinceKey)
            .addOptionalSerialized(value.getStarCitizenUser(), starCitizenUserKey, StarCitizenUserJsonSerializer.instance)
            .build();
    }
}
