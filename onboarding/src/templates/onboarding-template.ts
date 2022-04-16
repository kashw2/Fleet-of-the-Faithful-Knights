import {Candidate} from "@kashw2/lib-ts";
import {Either} from "funfix";
import {List} from "immutable";

export abstract class OnboardingTemplate {

    constructor() {
    }

    abstract importCandidate(): Promise<Either<string, List<Candidate>>>;

}