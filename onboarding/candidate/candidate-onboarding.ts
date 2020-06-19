import {Either} from "funfix-core";
import {List} from "immutable";
import {Candidate} from "../../core/src/models/candidate";
import {FfkApi} from "../../core/src";

export abstract class CandidateOnboarding {

    abstract async listCandidates(): Promise<Either<string, List<Candidate>>>;

    async listMissingCandidates(candidates: List<Candidate>): Promise<Either<string, List<Candidate>>> {
        return FfkApi.instance.listMissingCandidates(candidates);
    }

}
