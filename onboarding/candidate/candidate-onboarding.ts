import {Either} from "funfix-core";
import {List} from "immutable";
import {FfkApi} from "../../core/src/apis/ffk-api";
import {Candidate} from "@ffk/lib-ts";

export abstract class CandidateOnboarding {

    abstract async listCandidates(): Promise<Either<string, List<Candidate>>>;

    async listMissingCandidates(candidates: List<Candidate>): Promise<Either<string, List<Candidate>>> {
        return FfkApi.instance.listMissingCandidates(candidates);
    }

}
