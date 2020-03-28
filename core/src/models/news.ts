import {None, Option} from "funfix-core";
import {User, UserJsonSerializer} from "./user";
import {Moment} from 'moment';
import {
    contentKey,
    dateKey,
    idKey,
    JsonBuilder,
    parseMoment,
    parseNumber,
    parseSerialized,
    parseString,
    SimpleJsonSerializer,
    titleKey,
    userKey
} from "..";

export class News {

    constructor(
        readonly id: Option<number> = None,
        readonly user: Option<User> = None,
        readonly content: Option<string> = None,
        readonly title: Option<string> = None,
        readonly date: Option<Moment> = None, // TODO: Use MomentJS data structure
    ) {
    }

    public getContent(): Option<string> {
        return this.content;
    }

    public getDate(): Option<Moment> {
        return this.date;
    }

    public getId(): Option<number> {
        return this.id;
    }

    public getTitle(): Option<string> {
        return this.title;
    }

    public getUser(): Option<User> {
        return this.user;
    }

    public getUserGroup(): Option<string> {
        return this.getUser()
            .flatMap(u => u.getGroup());
    }

    public getUsername(): Option<string> {
        return this.getUser()
            .flatMap(u => u.getUsername());
    }

}

export class NewsJsonSerializer extends SimpleJsonSerializer<News> {
    static instance: NewsJsonSerializer = new NewsJsonSerializer();

    fromJson(json: any): News {
        return new News(
            parseNumber(json[idKey]),
            parseSerialized(json[userKey], UserJsonSerializer.instance),
            parseString(json[contentKey]),
            parseString(json[titleKey]),
            parseMoment(json[dateKey]),
        );
    }

    toJsonImpl(value: News, builder: JsonBuilder): object {
        return builder
            .addOptional(value.getId(), idKey)
            .addOptionalSerialized(value.getUser(), userKey, UserJsonSerializer.instance)
            .addOptional(value.getContent(), contentKey)
            .addOptional(value.getTitle(), titleKey)
            .addOptional(value.getDate(), dateKey)
            .build();
    }

}

