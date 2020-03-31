import {Either, Left, None, Option, Right} from "funfix-core";
import * as axios from 'axios';
import {SimpleJsonSerializer} from "./simple-json-serializer";
import {JsonBuilder} from "./json-builder";
import {
    accessTokenKey,
    expiresInKey,
    parseNumber,
    parseString,
    refreshTokenKey,
    scopeKey,
    tokenTypeKey, User,
    UserJsonSerializer
} from "..";
import * as querystring from 'querystring';

export class DiscordApi {

    static getTokenRequestUrl(): string {
        return 'https://discordapp.com/api/oauth2/token';
    }

    static getDiscordApiUrl(): string {
        return 'https://discordapp.com/api';
    }
    
    static getAccessToken(clientId: string, clientSecret: string, code: string): Promise<Either<string, DiscordOAuthResponse>> {
        return axios.default.post(this.getTokenRequestUrl(), querystring.encode({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'http://localhost:4200/login',
            scope: 'identify guilds',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(x => Right(DiscordOAuthResponseJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }
    
    static getUser(accessCode: string): Promise<Either<string, User>> {
        return axios.default.get(this.getDiscordApiUrl().concat('/users/@me'), {headers: {Authorization: `Bearer ${accessCode}`}})
            .then(x => Right(UserJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

}

export class DiscordOAuthResponse {

    constructor(
        readonly accessToken: Option<string> = None,
        readonly tokenType: Option<string> = None,
        readonly expiresIn: Option<number> = None,
        readonly refreshToken: Option<string> = None,
        readonly scope: Option<string> = None,
    ) {
    }

    getAccessToken(): Option<string> {
        return this.accessToken;
    }

    getTokenType(): Option<string> {
        return this.tokenType;
    }

    getExpiresIn(): Option<number> {
        return this.expiresIn;
    }

    getRefreshToken(): Option<string> {
        return this.refreshToken;
    }

    getScope(): Option<string> {
        return this.scope;
    }

}

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

    toJsonImpl(value: DiscordOAuthResponse, builder: JsonBuilder): object {
        return builder.addOptional(value.getAccessToken(), accessTokenKey)
            .addOptional(value.getTokenType(), tokenTypeKey)
            .addOptional(value.getExpiresIn(), expiresInKey)
            .addOptional(value.getRefreshToken(), refreshTokenKey)
            .addOptional(value.getScope(), scopeKey)
            .build();
    }

}
