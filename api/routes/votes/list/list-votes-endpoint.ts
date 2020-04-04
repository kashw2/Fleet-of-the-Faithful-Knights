import {Either} from "funfix-core";
import {List} from "immutable";
import {ApiUtils} from "../../../../core/src";
import {Vote} from "../../../../core/src/models/vote";
import {Database} from "../../../db/database";
import {GetRoute} from "../../get-route";

export class ListVotesEndpoint extends GetRoute {

    constructor(private db: Database) {
        super("/votes");
    }

    private getAllVotes(): Either<string, List<Vote>> {
        return this.db.cache.votes.getVotesEither();
    }

    isAuthorized(): boolean {
        return false;
    }

    run(req: Request, res: Response): void {
        ApiUtils.sendResult(this.getAllVotes(), res);
    }

}
