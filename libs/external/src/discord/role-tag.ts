import {None, Option} from 'funfix-core';
import {JsonBuilder, JsonSerializer, parseBoolean, parseString} from '@kashw2/lib-util';
import {botIdKey, integrationIdKey, premiumSubscriberKey} from './json-keys';

export class DiscordRoleTag {

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

export class RoleTagJsonSerializer extends JsonSerializer<DiscordRoleTag> {

	static instance: RoleTagJsonSerializer = new RoleTagJsonSerializer();

	fromJson(json: any): DiscordRoleTag {
		return new DiscordRoleTag(
			parseString(json[botIdKey]),
			parseString(json[integrationIdKey]),
			parseBoolean(json[premiumSubscriberKey]),
		);
	}

	toJson(value: DiscordRoleTag, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getBotId(), botIdKey)
			.addOptional(value.getIntegrationId(), integrationIdKey)
			.addOptional(value.getPremiumSubscriber(), premiumSubscriberKey)
			.build();
	}


}
