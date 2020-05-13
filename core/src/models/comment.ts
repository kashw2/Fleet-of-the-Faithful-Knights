import {None, Option} from "funfix-core";
import {
    contentKey, createdDateKey,
    idKey,
    JsonBuilder,
    parseNumber,
    parseSerialized,
    parseString,
    SimpleJsonSerializer,
    userKey,
} from "..";
import {User, UserJsonSerializer} from "./user";

export class Comment {

    constructor(
        readonly id: Option<number> = None,
        readonly user: Option<User> = None,
        readonly content: Option<string> = None,
        readonly createdDate: Option<string> = None,
    ) {
    }

    public getContent(): Option<string> {
        return this.content;
    }

    public getCreatedDate(): Option<string> {
        return this.createdDate;
    }

    public getId(): Option<number> {
        return this.id;
    }

    public getUser(): Option<User> {
        return this.user;
    }

    public getUserId(): Option<number> {
        return this.getUser()
            .flatMap(u => u.getId());
    }

    public getUsername(): Option<string> {
        return this.getUser()
            .flatMap(u => u.getUsername());
    }

}

export class CommentJsonSerializer extends SimpleJsonSerializer<Comment> {

    static instance: CommentJsonSerializer = new CommentJsonSerializer();

    fromJson(json: any): Comment {
        return new Comment(
            parseNumber(json[idKey]),
            parseSerialized(json[userKey], UserJsonSerializer.instance),
            parseString(json[contentKey]),
            parseString(json[createdDateKey]),
        );
    }

    toJson(value: Comment, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptionalSerialized(value.getUser(), userKey, UserJsonSerializer.instance)
            .addOptional(value.getContent(), contentKey)
            .addOptional(value.getCreatedDate(), createdDateKey)
            .build();
    }

}
