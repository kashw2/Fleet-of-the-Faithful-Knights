import {Option} from "funfix-core";
import {commentKey, contentKey, JsonBuilder, SimpleJsonSerializer, userIdKey} from "../..";
import {Comment} from "../comment";

export class DbComment {

    constructor(
        readonly content: string,
        readonly userId: number,
    ) {
    }

    static fromComment(comment: Comment): Option<DbComment> {
        return Option.map2(comment.getContent(), comment.getUserId(), (content, uid) => {
            return new DbComment(
                content,
                uid,
            );
        });
    }

    getContent(): string {
        return this.content;
    }

    getUserId(): number {
        return this.userId;
    }

}

export class DbCommentJsonSerializer extends SimpleJsonSerializer<DbComment> {

    static instance: DbCommentJsonSerializer = new DbCommentJsonSerializer();

    fromJson(json: any): DbComment {
        throw new Error("Db classes are read only");
    }

    toJson(value: DbComment, builder: JsonBuilder): object {
        return builder.add(value.getContent(), contentKey)
            .add(value.getUserId(), userIdKey)
            .build();
    }

}
