import {None, Option} from "funfix-core";
import {List} from "immutable";
import {JsonBuilder, JsonSerializer, parseList, parseNumber, parseString} from "@kashw2/lib-util";
import {accessTokenKey, expiresInKey, refreshTokenKey, scopeKey, tokenTypeKey} from "./json-keys";

export class DiscordToken {

  constructor(
    private accessToken: Option<string> = None,
    private tokenType: Option<string> = None,
    private expiresIn: Option<number> = None,
    private refreshToken: Option<string> = None,
    private scope: List<string> = List(),
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

  public getScope(): List<string> {
    return this.scope;
  }

  public getTokenType(): Option<string> {
    return this.tokenType;
  }

}

export class DiscordTokenJsonSerializer extends JsonSerializer<DiscordToken> {

  static instance: DiscordTokenJsonSerializer = new DiscordTokenJsonSerializer();

  fromJson(json: any): DiscordToken {
    return new DiscordToken(
      parseString(json[accessTokenKey]),
      parseString(json[tokenTypeKey]),
      parseNumber(json[expiresInKey]),
      parseString(json[refreshTokenKey]),
      parseList(json[scopeKey]),
    );
  }

  toJson(value: DiscordToken, builder: JsonBuilder): object {
    return builder.addOptional(value.getAccessToken(), accessTokenKey)
      .addOptional(value.getTokenType(), tokenTypeKey)
      .addOptional(value.getExpiresIn(), expiresInKey)
      .addOptional(value.getRefreshToken(), refreshTokenKey)
      .addIterable(value.getScope(), scopeKey)
      .build();
  }

}