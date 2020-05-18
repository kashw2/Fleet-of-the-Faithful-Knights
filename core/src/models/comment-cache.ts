import {Either} from "funfix-core";
import {List} from "immutable";
import {EitherUtils} from "..";
import {Comment} from "./comment";

export class CommentCache {

    constructor(private comments: List<Comment>) {
    }

    getComments(): List<Comment> {
        return this.comments;
    }

    getCommentsEither(): Either<string, List<Comment>> {
        return EitherUtils.liftEither(this.getComments(), "No comments in cache");
    }

    getFirst(): Comment {
        return this.getComments()
            .first();
    }

    getLast(): Comment {
        return this.getComments()
            .last();
    }

}
