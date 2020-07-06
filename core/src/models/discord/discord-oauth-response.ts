import {None, Option} from "funfix-core";
import {SimpleJsonSerializer} from "../../misc/simple-json-serializer";
import {parseNumber, parseString} from "../../util/object-utils";
import {accessTokenKey, expiresInKey, refreshTokenKey, scopeKey, tokenTypeKey} from "../../misc/json-keys";
import {JsonBuilder} from "../../misc/json-builder";

/**
 * This class should never find usage in the API cache
 * It is purely used for a one way transaction between the Discord API and the database
 */
export class DiscordOAuthResponse {

    constructor(
        readonly accessToken: Option<string> = None,
        readonly tokenType: Option<string> = None,
        readonly expiresIn: Option<number> = None,
        readonly refreshToken: Option<string> = None,
        readonly scope: Option<string> = None,
    ) {
    }

    public getAccessToken(): Option<string> {
        return this.accessToken;
    }

    public getExpiresIn(): Option<number> {
        return this.expiresIn;
    }

    public getRefreshToken(): Option<string> {
        return this.refreshToken;
    }

    public getScope(): Option<string> {
        return this.scope;
    }

    public getTokenType(): Option<string> {
        return this.tokenType;
    }

    public isUseful(): boolean {
        return this.getAccessToken()
            .nonEmpty();
    }

}

/**
 * This class should never find usage in the API cache
 * It is purely used for a one way transaction between the Discord API and the database
 */
export class DiscordOAuthResponseJsonSerializer extends SimpleJsonSerializer<DiscordOAuthResponse> {

    static instance: DiscordOAuthResponseJsonSerializer = new DiscordOAuthResponseJsonSerializer();

    fromJson(json: any): DiscordOAuthResponse {
        return new DiscordOAuthResponse(
            parseString(json[accessTokenKey]),
            parseString(json[tokenTypeKey]),
            parseNumber(json[expiresInKey]),
            parseString(json[refreshTokenKey]),
            parseString(json[scopeKey]),
        );
    }

    toJson(value: DiscordOAuthResponse, builder: JsonBuilder): object {
        return builder.addOptional(value.getAccessToken(), accessTokenKey)
            .addOptional(value.getTokenType(), tokenTypeKey)
            .addOptional(value.getExpiresIn(), expiresInKey)
            .addOptional(value.getRefreshToken(), refreshTokenKey)
            .addOptional(value.getScope(), scopeKey)
            .build();
    }

}
