import {Candidate} from "@kashw2/lib-ts";
import {List} from "immutable";

export abstract class OnboardingTemplate {

  constructor() {
  }

  abstract importCandidate(): Promise<List<Candidate>>;

}