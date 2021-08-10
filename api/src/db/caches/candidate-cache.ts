import {Candidate, Vote} from "@kashw2/lib-ts";
import {Cache} from "./cache";
import {List, Map} from "immutable";
import {Either, Option} from "funfix-core";
import {CollectionUtils, EitherUtils} from "@kashw2/lib-util";

export class CandidateCache extends Cache<Candidate> {

    constructor(private candidates: List<Candidate>) {
        super(candidates);
    }

    private byCandidateId: Map<string, Candidate> = CollectionUtils.buildKeyedMap(this.getCandidates(), v => v.getId());


    getCandidateById(candidateId: string): Either<string, Candidate> {
        return EitherUtils.toEither(Option.of(this.byCandidateId.get(candidateId)), `Candidate with id ${candidateId} does not exist`);
    }

    getCandidates(): List<Candidate> {
        return super.getValues();
    }

}