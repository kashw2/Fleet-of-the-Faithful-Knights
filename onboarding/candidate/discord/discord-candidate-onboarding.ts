import {Either} from "funfix-core";
import {List} from "immutable";
import {EitherUtils, FfkApi} from "../../../core/src";
import {Candidate} from "../../../core/src/models/candidate";
import {DiscordGuild} from "../../../core/src/models/discord/discord-guild";
import {CandidateOnboarding} from "../candidate-onboarding";
import {Onboarding} from "../../onboarding";
import {DiscordApi} from "../../../core/typescript/src/apis/discord-api";

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
