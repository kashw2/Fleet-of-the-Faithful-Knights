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
import {Moment} from 'moment';
import {Asset, AssetJsonSerializer} from './asset';
import {Emoji, EmojiJsonSerializer} from './emoji';
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
import {Party, PartyJsonSerializer} from './party';
import {Secret, SecretJsonSerializer} from './secret';
import {Timestamp, TimestampJsonSerializer} from './timestamp';

export class Activity {

	constructor(
		readonly name: Option<string> = None,
		readonly type: Option<number> = None,
		readonly url: Option<string> = None,
		readonly createdAt: Option<Moment> = None,
		readonly timestamps: List<Timestamp> = List(),
		readonly applicationId: Option<string> = None,
		readonly details: Option<string> = None,
		readonly state: Option<string> = None,
		readonly emoji: Option<Emoji> = None,
		readonly party: Option<Party> = None,
		readonly assets: Option<Asset> = None,
		readonly secrets: Option<Secret> = None,
		readonly instance: Option<boolean> = None,
		readonly flags: Option<number> = None,
	) {
	}

	public getFlags(): Option<number> {
		return this.flags;
	}

	public getInstance(): Option<boolean> {
		return this.instance;
	}

	public getSecret(): Option<Secret> {
		return this.secrets;
	}

	public getAssets(): Option<Asset> {
		return this.assets;
	}

	public getParty(): Option<Party> {
		return this.party;
	}

	public getEmoji(): Option<Emoji> {
		return this.emoji;
	}

	public getState(): Option<string> {
		return this.state;
	}

	public getDetails(): Option<string> {
		return this.details;
	}

	public getApplicationId(): Option<string> {
		return this.applicationId;
	}

	public getTimestamps(): List<Timestamp> {
		return this.timestamps;
	}

	public getCreatedAt(): Option<Moment> {
		return this.createdAt;
	}

	public getUrl(): Option<string> {
		return this.url;
	}

	public getType(): Option<number> {
		return this.type;
	}

	public getName(): Option<string> {
		return this.name;
	}

}

export class ActivityJsonSerializer extends JsonSerializer<Activity> {

	static instance: ActivityJsonSerializer = new ActivityJsonSerializer();

	fromJson(json: any): Activity {
		return new Activity(
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

	toJson(value: Activity, builder: JsonBuilder): object {
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