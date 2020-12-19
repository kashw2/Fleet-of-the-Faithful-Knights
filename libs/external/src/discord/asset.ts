import {None, Option} from "funfix-core";
import {JsonBuilder, JsonSerializer} from "@ffk/lib-util";
import {largeImageKey, largeTextKey, smallImageKey, smallTextKey} from "./json-keys";

export class Asset {

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

    public getSmallText(): Option<string> {
        return this.smallText;
    }

    public getSmallImage(): Option<string> {
        return this.smallImage;
    }

}

export class AssetJsonSerializer extends JsonSerializer<Asset> {

    static instance: AssetJsonSerializer = new AssetJsonSerializer();

    fromJson(json: any): Asset {
        return new Asset();
    }

    toJson(value: Asset, builder: JsonBuilder): object {
        return builder.addOptional(value.getLargeImage(), largeImageKey)
            .addOptional(value.getLargeText(), largeTextKey)
            .addOptional(value.getSmallImage(), smallImageKey)
            .addOptional(value.getSmallText(), smallTextKey)
            .build();
    }

}