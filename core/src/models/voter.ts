import {None, Option} from "funfix-core";
import {
    idKey, JsonBuilder,
    parseNumber,
    parseSerialized,
    parseString,
    responseKey,
    SimpleJsonSerializer,
    User,
    UserJsonSerializer,
    userKey,
} from "..";

export class Voter {

    constructor(
        readonly id: Option<number> = None,
        readonly user: Option<User> = None,
        readonly response: Option<string> = None,
    ) {
    }

    public didAffirm(): boolean {
        return this.getResponse()
            .contains("Y");
    }

    public didDeny(): boolean {
        return this.getResponse()
            .contains("N");
    }

    public getId(): Option<number> {
        return this.id;
    }

    public getResponse(): Option<string> {
        return this.response;
    }

    public getUser(): Option<User> {
        return this.user;
    }

    public getVoterUsername(): Option<string> {
        return this.getUser()
            .flatMap(u => u.getUsername());
    }

}

export class VoterJsonSerializer extends SimpleJsonSerializer<Voter> {

    static instance: VoterJsonSerializer = new VoterJsonSerializer();

    fromJson(json: object): Voter {
        return new Voter(
            parseNumber(json[idKey]),
            parseSerialized(json[userKey], UserJsonSerializer.instance),
            parseString(json[responseKey]),
        );
    }

    toJson(value: Voter, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptionalSerialized(value.getUser(), userKey, UserJsonSerializer.instance)
            .addOptional(value.getResponse(), responseKey)
            .build();
    }

}
