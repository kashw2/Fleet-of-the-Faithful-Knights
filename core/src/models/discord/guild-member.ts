import {None, Option} from "funfix-core";
import {User, UserJsonSerializer} from "../user";
import {List} from "immutable";
import {JsonBuilder, parseListString, parseSerialized, rolesKey, SimpleJsonSerializer, userKey} from "../..";

export class GuildMember {

    constructor(
        readonly user: Option<User> = None,
        readonly roles: List<string> = List(),
    ) {
    }

    getUser(): Option<User> {
        return this.user;
    }

    getRoles(): List<string> {
        return this.roles;
    }

}

export class GuildMemberJsonSerializer extends SimpleJsonSerializer<GuildMember> {

    static instance: GuildMemberJsonSerializer = new GuildMemberJsonSerializer();

    fromJson(json: any): GuildMember {
        return new GuildMember(
            parseSerialized(json[userKey], UserJsonSerializer.instance),
            parseListString(json[rolesKey]),
        )
    }

    toJsonImpl(value: GuildMember, builder: JsonBuilder): object {
        return builder.addOptional(value.getUser(), userKey)
            .addList(value.getRoles(), rolesKey)
            .build();


    }


}
