import {List} from "immutable";
import {JsonBuilder, SimpleJsonSerializer, urlKey} from "..";

export class Url {

    constructor(readonly uri: string) {
    }

    static buildFromUri(uri: string): Url {
        return new Url(uri);
    }

    public getDomain(): string {
        return this.getUri()
            .split("://")[1]
            .split("/")[0]
    }

    public getProtocol(): string {
        return this.getUri()
            .split("://")[0];
    }

    public getQueryKeys(): List<string> {
        throw new Error("Not implemented");
    }

    public getQueryValues(): List<string> {
        throw new Error("Not implemented");
    }

    public getResource(): string {
        return this.getUri()
            .split("#")[1]
    }

    public getUri(): string {
        return this.uri;
    }

    public getUrl(): string {
        return this.getProtocol()
            .concat("://")
            .concat(this.getUrn())
            .split("#")[0]
    }

    public getUrn(): string {
        return this.getUri()
            .split(this.getProtocol().concat("://"))[1]
            .split("/")[0];
    }

    public hasProtocol(): boolean {
        return this.getProtocol()
            .length > 0;
    }

    public hasWww(): boolean {
        return this.getUrn()
            .startsWith("www");
    }

    public isHttp(): boolean {
        return this.getUri()
            .startsWith("http") && !this.isHttps()
    }

    public isHttps(): boolean {
        return this.getUri()
            .startsWith("https")
    }

    public isUrl(): boolean {
        return !this.getUri()
                .includes("#")
            && this.hasProtocol();
    }

    public isUrn(): boolean {
        return !this.hasProtocol()
            && !this.isUrl();
    }

}

export class UrlJsonSerializer extends SimpleJsonSerializer<Url> {

    static instance: UrlJsonSerializer = new UrlJsonSerializer();

    fromJson(json: object): Url {
        return new Url(json[urlKey]);
    }

    toJson(value: Url, builder: JsonBuilder): object {
        return builder.add(value.getUrl(), urlKey)
            .build();
    }


}
