import {Client, Guild} from "discord.js";
import {Either, Left, Right} from "funfix-core";
import {List} from "immutable";
import {Manager} from "../manager";

export class ClientManager {

    constructor(private manager: Manager) {
    }

    getClient(): Client {
        return this.manager.client;
    }

    getClientGuilds(): List<Guild> {
        return List(
            this.getClient()
                .guilds
                .values(),
        );
    }

    getClientTag(): string {
        return this.getClient()
            .user
            .tag;
    }

    async getPremiumSince(): Promise<Either<string, Date>> {
        if (this.isClientPremium()) {
            const profile = await this.getClient()
                .user
                .fetchProfile();
            return Right(profile.premiumSince);
        }
        return Promise.resolve(Left("User is not Premium"));
    }

    isBot(): boolean {
        return this.getClient()
            .user
            .bot;
    }

    isClientPremium(): boolean {
        return this.getClient()
            .user
            .premium;
    }

}
