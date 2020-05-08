import {Either} from "funfix-core";
import {List} from "immutable";
import {EitherUtils} from "../../../core/src";
import {DiscordApi} from "../../../core/src/misc/discord-api";
import {Candidate} from "../../../core/src/models/candidate";
import {DiscordGuild} from "../../../core/src/models/discord/discord-guild";
import {CandidateOnboarding} from "../candidate-onboarding";
import {FfkApi} from "../../../core/src/misc/ffk-api";

export class DiscordCandidateOnboarding extends CandidateOnboarding {

    getGuild(): Promise<Either<string, DiscordGuild>> {
        return DiscordApi.getGuild();
    }

    async getGuildMemberCount(): Promise<number> {
        const guild = await this.getGuild();
        return guild
            .toOption()
            .flatMap(x => x.getApproximateMemberCount())
            .getOrElse(0);
    }

    private appropiateLimit(memberCount: number): number {
        if(memberCount >= 1000) {
            return Math.round(memberCount / 1000);
        }
        return 1000;
    }

    async listCandidates(): Promise<Either<string, List<Candidate>>> {
        const memberCount = await this.getGuildMemberCount();
        const guildMembers = await DiscordApi.getGuildMembers(this.appropiateLimit(memberCount));
        return guildMembers.map(gms => Candidate.fromDiscordGuildMembers(gms));
    }

    async onboard(): Promise<void> {
        this.listCandidates()
            .then(cs => {
                const candidates = EitherUtils.toList(cs);
                FfkApi.writeCandidates(candidates);
            });
    }

}
