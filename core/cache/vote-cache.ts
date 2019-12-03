import {Either} from "funfix-core";
import {List} from "immutable";
import {EitherUtils, Vote} from "..";

export class VoteCache {

    constructor(readonly votes: List<Vote>) {
    }

    getById(id: number): Vote {
        return this.votes.get(id) as Vote;
    }

    getByIdEither(id: number): Either<string, Vote> {
        return EitherUtils.liftEither(this.getById(id), "Vote not found");
    }

}
