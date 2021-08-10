import {Router} from "express";
import {DiscordCandidateOnboardingEndpoint} from "./discord-candidate-onboarding-endpoint";

export class AllEndpoints {

    static initialiseEndpoints(router: Router): void {
        new DiscordCandidateOnboardingEndpoint().mount(router);
    }

}
