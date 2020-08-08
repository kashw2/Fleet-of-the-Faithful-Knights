import {Either} from "funfix-core";
import {List} from "immutable";
import {EitherUtils} from "../util/either-utils";
import {Candidate} from "./candidate";

export class CandidateCache {

    constructor(private candidates: List<Candidate>) {
    }

    getById(id: number): Candidate {
        return this.getCandidates()
            .get(id)!;
    }

    getByIdEither(id: number): Either<string, Candidate> {
        return EitherUtils.liftEither(this.getById(id), `Candidate ${id} does not exist in cache`);
    }

    private getCandidates(): List<Candidate> {
        return this.candidates;
    }

    getCandidatesEither(): Either<string, List<Candidate>> {
        return EitherUtils.liftEither(this.getCandidates(), "No candidates in news cache");
    }

    getFirst(): Candidate {
        return this.getCandidates()
            .first();
    }

    getLast(): Candidate {
        return this.getCandidates()
            .last();
    }

}
