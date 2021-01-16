import {None, Option} from 'funfix-core';
import {JsonBuilder, JsonSerializer, parseString} from '@ffk/lib-util';
import {largeImageKey, largeTextKey, smallImageKey, smallTextKey} from './json-keys';

export class DiscordAsset {

	constructor(
		readonly largeImage: Option<string> = None,
		readonly largeText: Option<string> = None,
		readonly smallImage: Option<string> = None,
		readonly smallText: Option<string> = None,
	) {
	}

	public getLargeImage(): Option<string> {
		return this.largeImage;
	}

	public getLargeText(): Option<string> {
		return this.largeText;
	}

	public getSmallImage(): Option<string> {
		return this.smallImage;
	}

	public getSmallText(): Option<string> {
		return this.smallText;
	}

}

export class AssetJsonSerializer extends JsonSerializer<DiscordAsset> {

	static instance: AssetJsonSerializer = new AssetJsonSerializer();

	fromJson(json: any): DiscordAsset {
		return new DiscordAsset(
			parseString(json[largeImageKey]),
			parseString(json[largeTextKey]),
			parseString(json[smallImageKey]),
			parseString(json[smallTextKey])
		);
	}

	toJson(value: DiscordAsset, builder: JsonBuilder): Record<string, any> {
		return builder.addOptional(value.getLargeImage(), largeImageKey)
			.addOptional(value.getLargeText(), largeTextKey)
			.addOptional(value.getSmallImage(), smallImageKey)
			.addOptional(value.getSmallText(), smallTextKey)
			.build();
	}

}