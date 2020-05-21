import {FfkApi} from "../core/src/misc/ffk-api";
import {DiscordCandidateOnboarding} from "./candidate/discord/discord-candidate-onboarding";

export class Onboarding {

    static ffkApi = new FfkApi(process.env.FFK_API_ADDRESS!, process.env.FFK_API_TOKEN!);

    static onboard(): void {
        new DiscordCandidateOnboarding(this.ffkApi).onboard();
    }

}
