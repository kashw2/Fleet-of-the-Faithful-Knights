import {None, Option} from "funfix-core";
import {JsonBuilder, JsonSerializer} from "@ffk/lib-util";
import {desktopKey, mobileKey, webKey} from "./json-keys";

export class ClientStatus {

    constructor(
        readonly desktop: Option<string> = None,
        readonly mobile: Option<string> = None,
        readonly web: Option<string> = None,
    ) {
    }

    public getDesktop(): Option<string> {
        return this.desktop;
    }

    public getMobile(): Option<string> {
        return this.mobile;
    }

    public getWeb(): Option<string> {
        return this.web;
    }

}

export class ClientStatusJsonSerializer extends JsonSerializer<ClientStatus> {
    
    static instance: ClientStatusJsonSerializer = new ClientStatusJsonSerializer();

    fromJson(json: any): ClientStatus {
        return new ClientStatus();
    }

    toJson(value: ClientStatus, builder: JsonBuilder): object {
        return builder.addOptional(value.getDesktop(), desktopKey)
            .addOptional(value.getMobile(), mobileKey)
            .addOptional(value.getWeb(), webKey);
    }

}