import {OnboardingTemplate} from "../onboarding-template";
import {Candidate, CandidateJsonSerializer, FfkApi} from "@kashw2/lib-ts";
import {DiscordApi} from "@kashw2/lib-external";
import {map, switchMap, tap} from "rxjs/operators";
import {List} from "immutable";
import {DiscordOnboardingCandidate} from "./discord-onboarding-candidate";
import {firstValueFrom, from} from "rxjs";
import {OptionUtils} from "@kashw2/lib-util";

export class DiscordOnboardingTemplate extends OnboardingTemplate {

    constructor() {
        super();
    }

    importCandidate(): Promise<List<Candidate>> {
        const discordApi: DiscordApi = new DiscordApi(
            '607005043043860521',
            process.env.FFK_DISCORD_CLIENT_SECRET!,
            process.env.FFK_DISCORD_REDIRECT!,
            process.env.FFK_DISCORD_BOT_TOKEN!,
        );
        const ffkApi: FfkApi = new FfkApi(process.env.FFK_API_SERVER!);
        return firstValueFrom(discordApi.getGuildMembers('539188746114039818')
            .pipe(map(members => members.map(member => new DiscordOnboardingCandidate(member).buildCandidate())))
            .pipe(map(v => OptionUtils.flattenList(v)))
            .pipe(switchMap(discordCandidates => {
                return from(ffkApi.candidate().sendReadRequestList(CandidateJsonSerializer.instance))
                    .pipe(map(cachedCandidates => discordCandidates.filter(dc => cachedCandidates.every(cc => cc.getDiscordId().equals(dc.getDiscordId())))));
            }))
            .pipe(tap(v => console.log(`Ingested ${v.size} Candidates`)))
            .pipe(switchMap(candidates => {
                return from(ffkApi.candidate()
                    .sendCreateRequestList(
                        CandidateJsonSerializer.instance,
                        {},
                        {candidates: CandidateJsonSerializer.instance.toJsonArray(candidates.toArray())})
                );
            }))
        );
    }

}