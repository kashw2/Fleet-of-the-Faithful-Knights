import {None, Option} from "funfix-core";
import {SimpleJsonSerializer} from "../misc/simple-json-serializer";
import {parseNumber, parseString} from "../util/object-utils";
import {groupKey, idKey, passwordKey, tokenKey, usernameKey} from "../misc/json-keys";
import {JsonBuilder} from "../misc/json-builder";

export class User {

    constructor(
        readonly id: Option<number> = None,
        readonly username: Option<string> = None,
        readonly password: Option<string> = None,
        readonly token: Option<string> = None,
        readonly group: Option<string> = None,
    ) {
    }

    public getGroup(): Option<string> {
        return this.group;
    }

    public getId(): Option<number> {
        return this.id;
    }

    public getPassword(): Option<string> {
        return this.password;
    }

    public getToken(): Option<string> {
        return this.token;
    }

    public getUsername(): Option<string> {
        return this.username;
    }

    public isDeveloper(): boolean {
        return this.getGroup()
            .contains("Developer");
    }

    public isGrandMaster(): boolean {
        return this.getGroup()
            .contains("Grand Master");
    }

    public isKnight(): boolean {
        return this.getGroup()
            .contains("Knight");
    }

    public isKnightCommander(): boolean {
        return this.getGroup()
            .contains("Knight Commander");
    }

    public isKnightLieutenant(): boolean {
        return this.getGroup()
            .contains("Knight Lieutenant");
    }

    public isSergeant(): boolean {
        return this.getGroup()
            .contains("Sergeant");
    }

    public isSergeantFirstClass(): boolean {
        return this.getGroup()
            .contains("Sergeant First Class");
    }

}

export class UserJsonSerializer extends SimpleJsonSerializer<User> {

    static instance: UserJsonSerializer = new UserJsonSerializer();

    fromJson(json: any): User {
        return new User(
            parseNumber(json[idKey]),
            parseString(json[usernameKey]),
            parseString(json[passwordKey]),
            parseString(json[tokenKey]),
            parseString(json[groupKey]),
        )
    }

    toJsonImpl(value: User, builder: JsonBuilder): object {
        return builder
            .addOptional(value.getId(), idKey)
            .addOptional(value.getUsername(), usernameKey)
            .addOptional(value.getPassword(), passwordKey)
            .addOptional(value.getToken(), tokenKey)
            .addOptional(value.getGroup(), groupKey)
            .build();
    }

}
