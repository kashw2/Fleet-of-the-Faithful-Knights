import {
	JsonBuilder,
	JsonSerializer,
	parseBoolean,
	parseDate,
	parseListSerialized,
	parseNumber,
	parseString
} from '@ffk/lib-util';
import {None, Option} from 'funfix-core';
import {List} from 'immutable';
import * as moment from 'moment';
import {DiscordAsset, AssetJsonSerializer} from './asset';
import {DiscordEmoji, EmojiJsonSerializer} from './emoji';
import {
	applicationIdKey,
	assetsKey,
	createdAtKey,
	detailsKey,
	emojiKey,
	flagsKey,
	instanceKey,
	nameKey,
	partyKey,
	secretKey,
	stateKey,
	timestampsKey,
	typeKey,
	urlKey
} from './json-keys';
import {DiscordParty, PartyJsonSerializer} from './party';
import {DiscordSecret, SecretJsonSerializer} from './secret';
import {DiscordTimestamp, TimestampJsonSerializer} from './timestamp';

export class DiscordActivity {

	constructor(
		readonly name: Option<string> = None,
		readonly type: Option<number> = None,
		readonly url: Option<string> = None,
		readonly createdAt: Option<moment.Moment> = None,
		readonly timestamps: List<DiscordTimestamp> = List(),
		readonly applicationId: Option<string> = None,
		readonly details: Option<string> = None,
		readonly state: Option<string> = None,
		readonly emoji: Option<DiscordEmoji> = None,
		readonly party: Option<DiscordParty> = None,
		readonly assets: Option<DiscordAsset> = None,
		readonly secrets: Option<DiscordSecret> = None,
		readonly instance: Option<boolean> = None,
		readonly flags: Option<number> = None,
	) {
	}

	public getApplicationId(): Option<string> {
		return this.applicationId;
	}

	public getAssets(): Option<DiscordAsset> {
		return this.assets;
	}

	public getCreatedAt(): Option<moment.Moment> {
		return this.createdAt;
	}

	public getDetails(): Option<string> {
		return this.details;
	}

	public getEmoji(): Option<DiscordEmoji> {
		return this.emoji;
	}

	public getFlags(): Option<number> {
		return this.flags;
	}

	public getInstance(): Option<boolean> {
		return this.instance;
	}

	public getName(): Option<string> {
		return this.name;
	}

	public getParty(): Option<DiscordParty> {
		return this.party;
	}

	public getSecret(): Option<DiscordSecret> {
		return this.secrets;
	}

	public getState(): Option<string> {
		return this.state;
	}

	public getTimestamps(): List<DiscordTimestamp> {
		return this.timestamps;
	}

	public getType(): Option<number> {
		return this.type;
	}

	public getUrl(): Option<string> {
		return this.url;
	}

}

export class ActivityJsonSerializer extends JsonSerializer<DiscordActivity> {

	static instance: ActivityJsonSerializer = new ActivityJsonSerializer();

	fromJson(json: any): DiscordActivity {
		return new DiscordActivity(
			parseString(json[nameKey]),
			parseNumber(json[typeKey]),
			parseString(json[urlKey]),
			parseDate(json[createdAtKey]),
			parseListSerialized(json[timestampsKey], TimestampJsonSerializer.instance),
			parseString(json[applicationIdKey]),
			parseString(json[detailsKey]),
			parseString(json[stateKey]),
			EmojiJsonSerializer.instance.fromJsonImpl(json[emojiKey]),
			PartyJsonSerializer.instance.fromJsonImpl(json[partyKey]),
			AssetJsonSerializer.instance.fromJsonImpl(json[assetsKey]),
			SecretJsonSerializer.instance.fromJsonImpl(json[secretKey]),
			parseBoolean(json[instanceKey]),
			parseNumber(json[flagsKey]),
		);
	}

	toJson(value: DiscordActivity, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getName(), nameKey)
			.addOptional(value.getType(), typeKey)
			.addOptional(value.getUrl(), urlKey)
			.addOptional(value.getCreatedAt(), createdAtKey)
			.addIterableSerialized(value.getTimestamps(), timestampsKey, TimestampJsonSerializer.instance)
			.addOptional(value.getApplicationId(), applicationIdKey)
			.addOptional(value.getDetails(), detailsKey)
			.addOptional(value.getState(), stateKey)
			.addOptionalSerialized(value.getEmoji(), emojiKey, EmojiJsonSerializer.instance)
			.addOptionalSerialized(value.getParty(), partyKey, PartyJsonSerializer.instance)
			.addOptionalSerialized(value.getAssets(), assetsKey, AssetJsonSerializer.instance)
			.addOptionalSerialized(value.getSecret(), secretKey, SecretJsonSerializer.instance)
			.addOptional(value.getInstance(), instanceKey)
			.addOptional(value.getFlags(), flagsKey)
			.build();
	}


}