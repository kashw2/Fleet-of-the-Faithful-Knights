import {Option} from "funfix-core";
import {
    avatarKey,
    discriminatorKey,
    groupIdKey,
    JsonBuilder,
    localeKey,
    SimpleJsonSerializer,
    User,
    usernameKey,
} from "../..";
import {GroupUtils} from "../../util/group-utils";
import {DiscordGuildMember} from "../discord/discord-guild-member";

export class DbUser {

    constructor(
        private username: string,
        private discriminator: string,
        private groupId: number,
        private avatar: string,
        private locale: string = "en-US",
    ) {
    }

    static fromDiscordGuildMember(guildMember: DiscordGuildMember): Option<DbUser> {
        return Option.map4(
            guildMember.getUser().flatMap(u => u.getUsername()),
            guildMember.getUser().flatMap(u => u.getDiscriminatorWithSymbol()),
            guildMember.getUser().flatMap(u => u.getRequestFormedAvatarUrl()),
            guildMember.getUser().flatMap(u => u.getLocale()),
            (username, discriminator, avatar, locale) => {
                return new DbUser(
                    username,
                    discriminator,
                    GroupUtils.getGroupIdFromName(GroupUtils.getGroupNameFromDiscordRoleId(guildMember.getRoles().first())),
                    avatar,
                    locale,
                );
            },
        );
    }

    static fromUser(user: User): Option<DbUser> {
        return Option.map5(
            user.getUsername(),
            user.getDiscriminator(),
            user.getGroup(),
            user.getAvatar(),
            user.getLocale(),
            (username, discriminator, group, avatar, locale) => {
                return new DbUser(
                    username,
                    discriminator,
                    GroupUtils.getGroupIdFromName(GroupUtils.parseGroup(group)),
                    avatar,
                    locale,
                );
            },
        );
    }

    getAvatar(): string {
        return this.avatar;
    }

    getDiscriminator(): string {
        return this.discriminator;
    }

    getGroupId(): number {
        return this.groupId;
    }

    getLocale(): string {
        return this.locale;
    }

    getUsername(): string {
        return this.username;
    }

}

export class DbUserJsonSerializer extends SimpleJsonSerializer<DbUser> {

    static instance: DbUserJsonSerializer = new DbUserJsonSerializer();

    fromJson(json: any): DbUser {
        throw new Error("Db classes are read only");
    }

    toJson(value: DbUser, builder: JsonBuilder): object {
        return builder.add(value.getUsername(), usernameKey)
            .add(value.getDiscriminator(), discriminatorKey)
            .add(value.getAvatar(), avatarKey)
            .add(value.getGroupId(), groupIdKey)
            .add(value.getLocale(), localeKey)
            .build();
    }

}
