import {None, Option, Some} from "funfix-core";
import {contentKey, createdDateKey, idKey, userKey} from "../misc/json-keys";
import {parseNumber, parseSerialized, parseString} from "../util/object-utils";
import {JsonBuilder} from "../misc/json-builder";
import {SimpleJsonSerializer} from "../misc/simple-json-serializer";
import {User, UserJsonSerializer} from "./user";

export class Comment {

    constructor(
        private id: Option<number> = None,
        private user: Option<User> = None,
        private content: Option<string> = None,
        private createdDate: Option<string> = None,
    ) {
    }

    // TOOD: Add created date
    public static forCommentWriting(comment: string, user: User): Comment {
        return new Comment(
            None,
            Some(user),
            Some(comment),
            None,
        )
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
