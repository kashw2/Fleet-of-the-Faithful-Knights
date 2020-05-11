import {None, Option} from "funfix-core";
import {
    contentKey,
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
        readonly content: Option<string> = None,
        readonly user: Option<User> = None,
    ) {
    }

    public getContent(): Option<string> {
        return this.content;
    }

    public getId(): Option<number> {
        return this.id;
    }

    public getUser(): Option<User> {
        return this.user;
    }

}

export class CommentJsonSerializer extends SimpleJsonSerializer<Comment> {

    static instance: CommentJsonSerializer = new CommentJsonSerializer();

    fromJson(json: any): Comment {
        return new Comment(
            parseNumber(json[idKey]),
            parseString(json[contentKey]),
            parseSerialized(json[userKey], UserJsonSerializer.instance),
        );
    }

    toJson(value: Comment, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getContent(), contentKey)
            .addOptionalSerialized(value.getUser(), userKey, UserJsonSerializer.instance)
            .build();
    }

}
