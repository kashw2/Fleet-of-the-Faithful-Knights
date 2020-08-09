import {Request, Response} from "express";
import {Either} from "funfix-core";
import {Database} from "../../../db/database";
import {PostEndpoint} from "../../../../core/src/server/post-endpoint"
import {ApiUtils, Comment, CommentJsonSerializer, DbComment, User} from "@ffk/lib-ts";

export class WriteCommentEndpoint extends PostEndpoint {

    constructor(readonly db: Database) {
        super("/comment/write/:voteid", db);
    }

    private getComment(req: Request): Either<string, Comment> {
        return ApiUtils.parseSerializedFromBody(req, "comment", CommentJsonSerializer.instance);
    }

    getEndpointName(): string {
        return "Write Comment";
    }

    private getVoteId(req: Request): Either<string, number> {
        return ApiUtils.parseNumberFromPath(req, "voteid");
    }

    isAuthorized(user: User): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        Either.map2(this.getComment(req), this.getVoteId(req), (comment, vid) => {
            DbComment.fromComment(comment)
                .map(dbComment => ApiUtils.sendResultPromise(this.db.procedures.insert.insertComment(dbComment, vid), res));
            this.db.cache.cacheVotes();
        });
    }

}
