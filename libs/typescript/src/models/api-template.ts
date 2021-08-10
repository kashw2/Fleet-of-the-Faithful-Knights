import {None, Option} from "funfix-core";
import {User, UserJsonSerializer} from "./user";
import {JsonBuilder, JsonSerializer, parseString} from "@kashw2/lib-util";
import {codeKey, userKey} from "../misc/json-keys";

export class ApiTemplate {

    constructor(
        private user: Option<User> = None,
        private code: Option<string> = None,
    ) {
    }

    public getCode(): Option<string> {
        return this.code;
    }

    public getUser(): Option<User> {
        return this.user;
    }

}

export class ApiTemplateJsonSerializer extends JsonSerializer<ApiTemplate> {

    static instance: ApiTemplateJsonSerializer = new ApiTemplateJsonSerializer();

    fromJson(json: any): ApiTemplate {
        return new ApiTemplate(
            UserJsonSerializer.instance.fromJsonImpl(json[userKey]),
            parseString(json[codeKey]),
        );
    }

    toJson(value: ApiTemplate, builder: JsonBuilder): object {
        return builder.addOptionalSerialized(value.getUser(), userKey, UserJsonSerializer.instance)
            .addOptional(value.getCode(), codeKey)
            .build();
    }

}