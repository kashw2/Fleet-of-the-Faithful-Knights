import {None, Option} from 'funfix-core';
import {JsonBuilder, JsonSerializer, parseBoolean, parseString} from '@ffk/lib-util';
import {botIdKey, integrationIdKey, premiumSubscriberKey} from './json-keys';

export class RoleTag {

	constructor(
		readonly botId: Option<string> = None,
		readonly integrationId: Option<string> = None,
		readonly premiumSubscriber: Option<boolean> = None,
	) {
	}

	public getBotId(): Option<string> {
		return this.botId;
	}

	public getIntegrationId(): Option<string> {
		return this.integrationId;
	}

	public getPremiumSubscriber(): Option<boolean> {
		return this.premiumSubscriber;
	}

}

export class RoleTagJsonSerializer extends JsonSerializer<RoleTag> {

	static instance: RoleTagJsonSerializer = new RoleTagJsonSerializer();

	fromJson(json: any): RoleTag {
		return new RoleTag(
			parseString(json[botIdKey]),
			parseString(json[integrationIdKey]),
			parseBoolean(json[premiumSubscriberKey]),
		);
	}

	toJson(value: RoleTag, builder: JsonBuilder): object {
		return builder.addOptional(value.getBotId(), botIdKey)
			.addOptional(value.getIntegrationId(), integrationIdKey)
			.addOptional(value.getPremiumSubscriber(), premiumSubscriberKey)
			.build();
	}


}