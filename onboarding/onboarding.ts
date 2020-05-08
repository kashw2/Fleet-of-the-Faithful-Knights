import {DiscordCandidateOnboarding} from "./candidate/discord/discord-candidate-onboarding";

export class Onboarding {

    static onboard(): void {
        new DiscordCandidateOnboarding().onboard();
    }

}
