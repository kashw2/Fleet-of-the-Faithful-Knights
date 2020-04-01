import {None, Option} from "funfix-core";
import {idKey, JsonBuilder, nameKey, parseString, SimpleJsonSerializer} from "../..";

export class Guild {

    constructor(
        readonly id: Option<string> = None,
        readonly name: Option<string> = None,
    ) {
    }

    getId(): Option<string> {
        return this.id;
    }

    getName(): Option<string> {
        return this.name;
    }

}

export class GuildJsonSerializer extends SimpleJsonSerializer<Guild> {

    static instance: GuildJsonSerializer = new GuildJsonSerializer();

    fromJson(json: any): Guild {
        return new Guild(
            parseString(json[idKey]),
            parseString(json[nameKey]),
        )
    }

    toJsonImpl(value: Guild, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getName(), nameKey);
    }

}
