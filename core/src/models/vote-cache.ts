import {Either} from "funfix-core";
import {List} from "immutable";
import {EitherUtils} from "..";
import {News} from "./news";
import {Vote} from "./vote";

export class VoteCache {

    constructor(private votes: List<Vote>) {
    }

    getById(id: number): Vote {
        return this.getVotes()
            .get(id)!;
    }

    getByIdEither(id: number): Either<string, Vote> {
        return EitherUtils.liftEither(this.getById(id), `Vote ${id} does not exist in cache`);
    }

    getFirst(): Vote {
        return this.getVotes()
            .first();
    }

    getLast(): Vote {
        return this.getVotes()
            .last();
    }

    private getVotes(): List<Vote> {
        return this.votes;
    }

    getVotesEither(): Either<string, List<Vote>> {
        return EitherUtils.liftEither(this.getVotes(), "No votes in vote cache");
    }

}
