import {List} from "immutable";
import {Comment} from "./comment";

export class CommentCache {

    constructor(private comments: List<Comment>) {
    }

    getComments(): List<Comment> {
        return this.comments;
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
