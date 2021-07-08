import {Cache} from "./cache";
import {Vote} from "@kashw2/lib-ts";
import {List, Map} from "immutable";
import {CollectionUtils, EitherUtils} from "@kashw2/lib-util";
import {Either, Option} from "funfix-core";

export class VoteCache extends Cache<Vote> {

    constructor(private votes: List<Vote> = List()) {
        super(votes);
    }

    private byVoteId: Map<string, Vote> = CollectionUtils.buildKeyedMap(this.getVotes(), v => v.getId());

    getByVoteId(voteId: string): Either<string, Vote> {
        return EitherUtils.toEither(Option.of(this.byVoteId.get(voteId)), `Vote with id ${voteId} does not exist`);
    }

    getVotes(): List<Vote> {
        return this.votes;
    }

}