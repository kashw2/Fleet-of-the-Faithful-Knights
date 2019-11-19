import {None, Option} from "funfix-core";
import {idKey, rankKey, usernameKey} from "../keys/json-keys";
import {OptionUtils} from "../utils/option-utils";
import {JsonBuilder, JsonSerializer} from "./json-serializer";
import {Rank, RankJsonSerializer} from "./rank";

export class User {

    constructor(
        readonly id: Option<number> = None,
        readonly username: Option<string> = None,
        readonly rank: Option<Rank> = None,
    ) {
    }

    getId(): Option<number> {
        return this.id;
    }

    getRank(): Option<Rank> {
        return this.rank;
    }

    getUsername(): Option<string> {
        return this.username;
    }

    isEmpty(): boolean {
        return this.getId().isEmpty()
            && this.getUsername().isEmpty()
            && this.getRank().isEmpty();
    }

}

export class UserJsonSerializer extends JsonSerializer<User> {
    static instance: UserJsonSerializer = new UserJsonSerializer();

    fromJson(obj: any): User {
        return Option.of(new User(
            OptionUtils.parseNumber(obj[idKey]),
            OptionUtils.parseString(obj[usernameKey]),
            OptionUtils.parseSerialised(obj[rankKey], RankJsonSerializer.instance),
        )).map(x => this.toJsonImpl(x)).getOrElse(new User());
    }

    toJson(value: User, builder: JsonBuilder): JsonBuilder {
        return builder
            .addOptional(idKey, value.getId())
            .addOptional(usernameKey, value.getUsername())
            .addOptionalSerialized(rankKey, value.getRank(), RankJsonSerializer.instance);
    }

    toType(obj: any): User {
        return new User(
            OptionUtils.parseNumber(obj[idKey]),
            OptionUtils.parseString(obj[usernameKey]),
            Option.of(RankJsonSerializer.instance.toType(obj[rankKey])),
        );
    }

}
