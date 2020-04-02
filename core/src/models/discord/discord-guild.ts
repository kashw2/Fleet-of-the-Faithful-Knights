import {None, Option} from "funfix-core";
import {idKey, JsonBuilder, nameKey, parseString, SimpleJsonSerializer} from "../..";

export class DiscordGuild {

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

export class DiscordGuildJsonSerializer extends SimpleJsonSerializer<DiscordGuild> {

    static instance: DiscordGuildJsonSerializer = new DiscordGuildJsonSerializer();

    fromJson(json: any): DiscordGuild {
        return new DiscordGuild(
            parseString(json[idKey]),
            parseString(json[nameKey]),
        )
    }

    toJsonImpl(value: DiscordGuild, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getName(), nameKey);
    }

}
