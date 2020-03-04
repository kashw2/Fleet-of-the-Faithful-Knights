import {None, Option} from "funfix-core";
import {User, UserJsonSerializer} from "./user";
import {
    contentKey, dateKey,
    idKey,
    JsonBuilder, newsKey,
    parseNumber,
    parseSerialized,
    parseString,
    SimpleJsonSerializer,
    userKey
} from "..";

export class News {

    constructor(
        readonly id: Option<number> = None,
        readonly user: Option<User> = None,
        readonly content: Option<string> = None,
        readonly date: Option<string> = None, // TODO: Use MomentJS data structure
    ) {
    }

    getContent(): Option<string> {
        return this.content;
    }

    getDate(): Option<string> {
        return this.date;
    }

    getId(): Option<number> {
        return this.id;
    }

    getUser(): Option<User> {
        return this.user;
    }

}

export class NewsJsonSerializer extends SimpleJsonSerializer<News> {
    static instance: NewsJsonSerializer = new NewsJsonSerializer();

    fromJson(json: any): News {
        return new News(
            parseNumber(json[idKey]),
            parseSerialized(json[userKey], UserJsonSerializer.instance),
            parseString(json[contentKey]),
            parseString(json[dateKey]),
        );
    }

    toJsonImpl(value: News, builder: JsonBuilder): object {
        return builder
            .addOptional(value.getId(), idKey)
            .addOptionalSerialized(value.getUser(), userKey, UserJsonSerializer.instance)
            .addOptional(value.getContent(), contentKey)
            .addOptional(value.getDate(), dateKey)
            .build();
    }

}

