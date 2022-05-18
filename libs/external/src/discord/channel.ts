import {None, Option} from 'funfix-core';
import {DiscordOverwrite, DiscordOverwriteJsonSerializer} from './overwrite';
import {Set} from 'immutable';
import {DiscordUser, DiscordUserJsonSerializer} from './user';
import * as moment from 'moment';
import {JsonBuilder, JsonSerializer, parseBoolean, parseDate, parseNumber, parseSetSerialized, parseString} from '@kashw2/lib-util';
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
  permissionOverwritesKey,
  positionKey,
  rateLimitPerUserKey,
  recipientsKey,
  topicKey,
  typeKey,
  userLimitKey
} from './json-keys';

export class DiscordChannel {

  constructor(
    readonly id: Option<string> = None,
    readonly type: Option<number> = None,
    readonly guildId: Option<string> = None,
    readonly position: Option<number> = None,
    readonly permissionOverwrites: Set<DiscordOverwrite> = Set(),
    readonly name: Option<string> = None,
    readonly topic: Option<string> = None,
    readonly nsfw: Option<boolean> = None,
    readonly lastMessageId: Option<string> = None,
    readonly bitrate: Option<number> = None,
    readonly userLimit: Option<number> = None,
    readonly rateLimitPerUser: Option<number> = None,
    readonly recipients: Set<DiscordUser> = Set(),
    readonly icon: Option<string> = None,
    readonly ownerId: Option<string> = None,
    readonly applicationId: Option<string> = None,
    readonly parentId: Option<string> = None,
    readonly lastPinTimestamp: Option<moment.Moment> = None,
  ) {
  }

  public getApplicationId(): Option<string> {
    return this.applicationId;
  }

  public getBitrate(): Option<number> {
    return this.bitrate;
  }

  public getGuildId(): Option<string> {
    return this.guildId;
  }

  public getIcon(): Option<string> {
    return this.icon;
  }

  public getId(): Option<string> {
    return this.id;
  }

  public getLastMessageId(): Option<string> {
    return this.lastMessageId;
  }

  public getLastPinTimestamp(): Option<moment.Moment> {
    return this.lastPinTimestamp;
  }

  public getName(): Option<string> {
    return this.name;
  }

  public getNsfw(): Option<boolean> {
    return this.nsfw;
  }

  public getOwnerId(): Option<string> {
    return this.ownerId;
  }

  public getParentId(): Option<string> {
    return this.parentId;
  }

  public getPermissionOverwrites(): Set<DiscordOverwrite> {
    return this.permissionOverwrites;
  }

  public getPosition(): Option<number> {
    return this.position;
  }

  public getRateLimitPerUser(): Option<number> {
    return this.rateLimitPerUser;
  }

  public getRecipients(): Set<DiscordUser> {
    return this.recipients;
  }

  public getTopic(): Option<string> {
    return this.topic;
  }

  public getType(): Option<number> {
    return this.type;
  }

  public getUserLimit(): Option<number> {
    return this.userLimit;
  }

}

export class DiscordChannelJsonSerializer extends JsonSerializer<DiscordChannel> {

  static instance: DiscordChannelJsonSerializer = new DiscordChannelJsonSerializer();

  fromJson(json: any): DiscordChannel {
    return new DiscordChannel(
      parseString(json[idKey]),
      parseNumber(json[typeKey]),
      parseString(json[guildIdKey]),
      parseNumber(json[positionKey]),
      parseSetSerialized(json[permissionOverwritesKey], DiscordOverwriteJsonSerializer.instance),
      parseString(json[nameKey]),
      parseString(json[topicKey]),
      parseBoolean(json[nsfwKey]),
      parseString(json[lastMessageIdKey]),
      parseNumber(json[bitrateKey]),
      parseNumber(json[userLimitKey]),
      parseNumber(json[rateLimitPerUserKey]),
      parseSetSerialized(json[recipientsKey], DiscordUserJsonSerializer.instance),
      parseString(json[iconKey]),
      parseString(json[ownerIdKey]),
      parseString(json[applicationIdKey]),
      parseString(json[parentIdKey]),
      parseDate(json[lastPinTimestampKey]),
    );
  }

  toJson(value: DiscordChannel, builder: JsonBuilder): Record<string, any> {
    return builder.addOptional(value.getId(), idKey)
      .addOptional(value.getType(), typeKey)
      .addOptional(value.getGuildId(), guildIdKey)
      .addOptional(value.getPosition(), positionKey)
      .addIterableSerialized(value.getPermissionOverwrites(), permissionOverwritesKey, DiscordOverwriteJsonSerializer.instance)
      .addOptional(value.getName(), nameKey)
      .addOptional(value.getTopic(), topicKey)
      .addOptional(value.getNsfw(), nsfwKey)
      .addOptional(value.getLastMessageId(), lastMessageIdKey)
      .addOptional(value.getBitrate(), bitrateKey)
      .addOptional(value.getUserLimit(), userLimitKey)
      .addOptional(value.getRateLimitPerUser(), rateLimitPerUserKey)
      .addIterableSerialized(value.getRecipients(), recipientsKey, DiscordUserJsonSerializer.instance)
      .addOptional(value.getIcon(), iconKey)
      .addOptional(value.getOwnerId(), ownerIdKey)
      .addOptional(value.getApplicationId(), applicationIdKey)
      .addOptional(value.getParentId(), parentIdKey)
      .addOptional(value.getLastPinTimestamp(), lastPinTimestampKey)
      .build();
  }

}
