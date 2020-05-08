import {Either} from "funfix-core";
import {List} from "immutable";
import {Candidate} from "../../core/src/models/candidate";

export abstract class CandidateOnboarding {

    abstract async listCandidates(): Promise<Either<string, List<Candidate>>>;

}
