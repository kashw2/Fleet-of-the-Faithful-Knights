import {None, Option, Some} from "funfix-core";
import {List} from "immutable";
import {
    avatarKey,
    discriminatorKey,
    idKey,
    JsonBuilder, localeKey, parseList,
    parseString,
    rolesKey,
    SimpleJsonSerializer,
    usernameKey,
} from "../..";

export class DiscordUser {

    constructor(
        readonly id: Option<string> = None,
        readonly username: Option<string> = None,
        readonly avatar: Option<string> = None,
        readonly discriminator: Option<string> = None,
        readonly locale: Option<string> = Some("en-US"),
        readonly roles: List<string> = List(),
    ) {
    }

    getAvatar(): Option<string> {
        return this.avatar;
    }

    getDiscriminator(): Option<string> {
        return this.discriminator;
    }

    getId(): Option<string> {
        return this.id;
    }

    getLocale(): Option<string> {
        return this.locale;
    }

    getRequestFormedAvatarUrl(): Option<string> {
        return Option.map2(this.getAvatar(), this.getId(), (avatar, id) => {
            return `/avatars/${id}/${avatar}.png`;
        });
    }

    getRoles(): List<string> {
        return this.roles;
    }

    getUsername(): Option<string> {
        return this.username;
    }

    withRoles(roles: List<string>): DiscordUser {
        return new DiscordUser(
            this.getId(),
            this.getUsername(),
            this.getRequestFormedAvatarUrl(),
            this.getDiscriminator(),
            this.getLocale(),
            this.getRoles(),
        );
    }

}

export class DiscordUserJsonSerilaizer extends SimpleJsonSerializer<DiscordUser> {

    static instance: DiscordUserJsonSerilaizer = new DiscordUserJsonSerilaizer();

    fromJson(json: any): DiscordUser {
        return new DiscordUser(
            parseString(json[idKey]),
            parseString(json[usernameKey]),
            parseString(json[avatarKey]),
            parseString(json[discriminatorKey]),
            parseString(json[localeKey]),
            parseList(json[rolesKey]),
        );
    }

    toJsonImpl(value: DiscordUser, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getUsername(), usernameKey)
            .addOptional(value.getRequestFormedAvatarUrl(), avatarKey)
            .addOptional(value.getDiscriminator(), discriminatorKey)
            .addOptional(value.getLocale(), localeKey)
            .addList(value.getRoles(), rolesKey)
            .build();
    }

}
