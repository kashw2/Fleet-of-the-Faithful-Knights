import {Client} from "discord.js";

export abstract class EventManager {

    constructor(readonly client: Client) {
    }

    getClient(): Client {
        return this.client;
    }

    getClientTag(): string {
        return this.getClient()
            .user
            .tag;
    }

    getClientUsername(): string {
        return this.getClient()
            .user
            .username;
    }

    abstract initialiseEvent(): void;

}
