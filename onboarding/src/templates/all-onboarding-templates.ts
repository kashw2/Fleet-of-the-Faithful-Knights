import {Either} from "funfix-core";
import {OnboardingTemplate} from "./onboarding-template";
import {Map} from 'immutable';
import {DiscordOnboardingTemplate} from "./discord/discord-onboarding-template";
import {EitherUtils} from "@kashw2/lib-util";

export class AllOnboardingTemplates {

    static onboardingTemplates: Map<string, OnboardingTemplate> = Map(
        {
            "DISCORD": new DiscordOnboardingTemplate()
        },
    );

    static getOnbboardingTemplate(code: string): Either<string, OnboardingTemplate> {
        return EitherUtils.liftEither(this.onboardingTemplates.get(code)!, `${code} does not exist in the template map`);
    }

}