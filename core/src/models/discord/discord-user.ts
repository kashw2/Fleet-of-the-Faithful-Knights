import {None, Option, Some} from "funfix-core";
import {List, Set} from "immutable";
import {SimpleJsonSerializer} from "../../misc/simple-json-serializer";
import {parseSet, parseString} from "../../util/object-utils";
import {avatarKey, discriminatorKey, idKey, localeKey, rolesKey, usernameKey} from "../../misc/json-keys";
import {JsonBuilder} from "../../misc/json-builder";

/**
 * This class should never find usage in the API cache
 * It is purely used for a one way transaction between the Discord API and the database
 */
export class DiscordUser {

    constructor(
        readonly id: Option<string> = None,
        readonly username: Option<string> = None,
        readonly avatar: Option<string> = None,
        readonly discriminator: Option<string> = None,
        readonly locale: Option<string> = Some("en-US"),
        readonly roles: Set<string> = Set(),
    ) {
    }

    public getAvatar(): Option<string> {
        return this.avatar;
    }

    public getDiscriminator(): Option<string> {
        return this.discriminator;
    }

    public getDiscriminatorWithSymbol(): Option<string> {
        return this.getDiscriminator()
            .map(x => "#".concat(x));
    }

    public getId(): Option<string> {
        return this.id;
    }

    public getLocale(): Option<string> {
        return this.locale;
    }

    public getRequestFormedAvatarUrl(): Option<string> {
        return Option.map2(this.getAvatar(), this.getId(), (avatar, id) => {
            return `/avatars/${id}/${avatar}.png`;
        });
    }

    public getRoles(): Set<string> {
        return this.roles;
    }

    public getUsername(): Option<string> {
        return this.username;
    }

    public withRoles(roles: List<string>): DiscordUser {
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

/**
 * This class should never find usage in the API cache
 * It is purely used for a one way transaction between the Discord API and the database
 */
export class DiscordUserJsonSerilaizer extends SimpleJsonSerializer<DiscordUser> {

    static instance: DiscordUserJsonSerilaizer = new DiscordUserJsonSerilaizer();

    fromJson(json: any): DiscordUser {
        return new DiscordUser(
            parseString(json[idKey]),
            parseString(json[usernameKey]),
            parseString(json[avatarKey]),
            parseString(json[discriminatorKey]),
            parseString(json[localeKey]),
            parseSet(json[rolesKey]),
        );
    }

    toJson(value: DiscordUser, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getUsername(), usernameKey)
            .addOptional(value.getRequestFormedAvatarUrl(), avatarKey)
            .addOptional(value.getDiscriminator(), discriminatorKey)
            .addOptional(value.getLocale(), localeKey)
            .addSet(value.getRoles(), rolesKey)
            .build();
    }

}
