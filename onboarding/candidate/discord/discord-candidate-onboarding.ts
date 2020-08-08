import {Either} from "funfix-core";
import {List} from "immutable";
import {CandidateOnboarding} from "../candidate-onboarding";
import {Onboarding} from "../../onboarding";
import {DiscordRole, DiscordGuild, Candidate, EitherUtils} from "@ffk/lib-ts";
import {DiscordApi} from "../../../core/src/apis/discord-api";
import {FfkApi} from "../../../core/src/apis/ffk-api";

export class DiscordCandidateOnboarding extends CandidateOnboarding {

    constructor() {
        super();
    }

    getGuild(): Promise<Either<string, DiscordGuild>> {
        return DiscordApi.instance.getGuild();
    }

    async getGuildMemberCount(): Promise<number> {
        const guild = await this.getGuild();
        return guild
            .toOption()
            .flatMap(x => x.getApproximateMemberCount())
            .getOrElse(0);
    }

    private appropiateLimit(memberCount: number): number {
        if (memberCount >= 1000) {
            return Math.round(memberCount / 1000);
        }
        return 1000;
    }

    async listCandidates(): Promise<Either<string, List<Candidate>>> {
        const memberCount = await this.getGuildMemberCount();
        const guildMembers = await DiscordApi.instance.listGuildMembers(this.appropiateLimit(memberCount));
        return guildMembers.map(gms => Candidate.fromDiscordGuildMembers(gms));
    }

    async onboard(): Promise<void> {
        this.listCandidates()
            .then(async cs => {
                // FIXME: There's an issue with listMissing, don't know much more tbh
                // const candidates = await this.listMissingCandidates(EitherUtils.toList(cs))
                const candidates = EitherUtils.toList(cs);
                FfkApi.instance.writeCandidates(candidates);
            });
    }

}
