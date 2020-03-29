import {Either, Left, None, Option, Right} from "funfix-core";
import * as axios from 'axios';
import {SimpleJsonSerializer} from "./simple-json-serializer";
import {JsonBuilder} from "./json-builder";
import {accessTokenKey, expiresInKey, parseNumber, parseString, refreshTokenKey, scopeKey, tokenTypeKey} from "..";
import * as querystring from 'querystring';

export class DiscordApi {

    static getTokenRequestUrl(): string {
        return 'https://discordapp.com/api/oauth2/token';
    }

    static getAccessToken(clientId: string, clientSecret: string, code: string): Promise<Either<string, DiscordAccessToken>> {
        return axios.default.post(this.getTokenRequestUrl(), querystring.encode({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'http://localhost:8080/user/login',
            scope: 'identify guilds',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(x => Right(DiscordAccessTokenJsonSerializer.instance.fromJson(x.data)))
            .catch(x => Left(x));
    }

}

export class DiscordAccessToken {

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

export class DiscordAccessTokenJsonSerializer extends SimpleJsonSerializer<DiscordAccessToken> {

    static instance: DiscordAccessTokenJsonSerializer = new DiscordAccessTokenJsonSerializer();

    fromJson(json: any): DiscordAccessToken {
        return new DiscordAccessToken(
            parseString(json[accessTokenKey]),
            parseString(json[tokenTypeKey]),
            parseNumber(json[expiresInKey]),
            parseString(json[refreshTokenKey]),
            parseString(json[scopeKey]),
        );
    }

    toJsonImpl(value: DiscordAccessToken, builder: JsonBuilder): object {
        return builder.addOptional(value.getAccessToken(), accessTokenKey)
            .addOptional(value.getTokenType(), tokenTypeKey)
            .addOptional(value.getExpiresIn(), expiresInKey)
            .addOptional(value.getRefreshToken(), refreshTokenKey)
            .addOptional(value.getScope(), scopeKey)
            .build();
    }

}
