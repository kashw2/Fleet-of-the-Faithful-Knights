import {None, Option} from "funfix-core";
import {parseBoolean, parseNumber, parseSerializedList, parseString} from "../../util/object-utils";
import {
    applicationIdKey,
    bitrateKey,
    guildIdKey,
    iconKey,
    idKey,
    lastMessageIdKey,
    lastPinTimestampKey,
    nameKey,
    nsfwKey,
    ownerIdKey,
    parentIdKey,
    positionKey,
    rateLimitPerUserKey,
    recipientsKey,
    topicKey,
    typeKey,
    userLimitKey
} from "../../misc/json-keys";
import {SimpleJsonSerializer} from "../../misc/simple-json-serializer";
import {List, Map} from "immutable";
import {DiscordUser, DiscordUserJsonSerilaizer} from "./discord-user";
import {JsonBuilder} from "../../misc/json-builder";

export type ChannelType = "GUILD_TEXT" | "DM" | "GUILD_VOICE" | "GROUP_DM" | "GUILD_CATEGORY" | "GUILD_NEWS" | "GUILD_STORE";
// @ts-ignore
export const ChannelTypeMap: Map<number, ChannelType> = Map({
    0: "GUILD_TEXT",
    1: "DM",
    2: "GUILD_VOICE",
    3: "GROUP_DM",
    4: "GUILD_CATEGORY",
    5: "GUILD_NEWS",
    6: "GUILD_STORE",
});

export class DiscordChannel {

    constructor(
        readonly id: Option<string> = None,
        readonly type: Option<number> = None,
        readonly guildId: Option<string> = None,
        readonly position: Option<number> = None,
        readonly name: Option<string> = None,
        readonly topic: Option<string> = None,
        readonly nsfw: Option<boolean> = None,
        readonly lastMessageId: Option<string> = None,
        readonly bitrate: Option<number> = None,
        readonly userLimit: Option<number> = None,
        readonly rateLimitPerUser: Option<number> = None,
        readonly recipients: List<DiscordUser> = List(),
        readonly icon: Option<string> = None,
        readonly ownerId: Option<string> = None,
        readonly applicationId: Option<string> = None,
        readonly parentId: Option<string> = None,
        readonly lastPinTimestamp: Option<string> = None,
    ) {
    }

    getApplicationId(): Option<string> {
        return this.applicationId;
    }

    getBitrate(): Option<number> {
        return this.bitrate;
    }

    getGuildId(): Option<string> {
        return this.guildId;
    }

    getIcon(): Option<string> {
        return this.icon;
    }

    getId(): Option<string> {
        return this.id;
    }

    getLastMessageId(): Option<string> {
        return this.lastMessageId;
    }

    getLastPinTimestamp(): Option<string> {
        return this.lastPinTimestamp;
    }

    getName(): Option<string> {
        return this.name;
    }

    getNSFW(): Option<boolean> {
        return this.nsfw;
    }

    getOwnerId(): Option<string> {
        return this.ownerId;
    }

    getParentId(): Option<string> {
        return this.parentId;
    }

    getPosition(): Option<number> {
        return this.position;
    }

    getRateLimitPerUser(): Option<number> {
        return this.rateLimitPerUser;
    }

    getRecipients(): List<DiscordUser> {
        return this.recipients;
    }

    getTopic(): Option<string> {
        return this.topic;
    }

    getType(): Option<number> {
        return this.type;
    }

    getTypeWithDiscordChannelType(): Option<ChannelType> {
        // @ts-ignore
        return this.getType()
            .map(typeId => ChannelTypeMap.get(typeId));
    }

    getUserLimit(): Option<number> {
        return this.userLimit;
    }

    isNSFW(): boolean {
        return this.nsfw
            .getOrElse(false);
    }

}

export class DiscordChannelJsonSerializer extends SimpleJsonSerializer<DiscordChannel> {

    static instance: DiscordChannelJsonSerializer = new DiscordChannelJsonSerializer();

    fromJson(json: any): DiscordChannel {
        return new DiscordChannel(
            parseString(json[idKey]),
            parseNumber(json[typeKey]),
            parseString(json[guildIdKey]),
            parseNumber(json[positionKey]),
            parseString(json[nameKey]),
            parseString(json[topicKey]),
            parseBoolean(json[nsfwKey]),
            parseString(json[lastMessageIdKey]),
            parseNumber(json[bitrateKey]),
            parseNumber(json[userLimitKey]),
            parseNumber(json[rateLimitPerUserKey]),
            parseSerializedList(json[recipientsKey], DiscordUserJsonSerilaizer.instance),
            parseString(json[iconKey]),
            parseString(json[ownerIdKey]),
            parseString(json[applicationIdKey]),
            parseString(json[parentIdKey]),
            parseString(json[lastPinTimestampKey]),
        );
    }

    toJson(value: DiscordChannel, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getType(), typeKey)
            .addOptional(value.getGuildId(), guildIdKey)
            .addOptional(value.getPosition(), positionKey)
            .addOptional(value.getName(), nameKey)
            .addOptional(value.getTopic(), topicKey)
            .addOptional(value.getNSFW(), nsfwKey)
            .addOptional(value.getLastMessageId(), lastMessageIdKey)
            .addOptional(value.getBitrate(), bitrateKey)
            .addOptional(value.getUserLimit(), userLimitKey)
            .addOptional(value.getRateLimitPerUser(), rateLimitPerUserKey)
            .addListSerialized(value.getRecipients(), recipientsKey, DiscordUserJsonSerilaizer.instance)
            .addOptional(value.getIcon(), iconKey)
            .addOptional(value.getOwnerId(), ownerIdKey)
            .addOptional(value.getApplicationId(), applicationIdKey)
            .addOptional(value.getParentId(), parentIdKey)
            .addOptional(value.getLastPinTimestamp(), lastPinTimestampKey)
            .build();
    }

}
