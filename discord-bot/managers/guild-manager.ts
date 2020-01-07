import {Guild} from "discord.js";
import {List} from "immutable";
import {Manager} from "../manager";

export class GuildManager {

    constructor(private manager: Manager) {
    }

    getClientGuilds(): List<Guild> {
        return List(
            this.manager
                .clientManager
                .getClient()
                .guilds
                .values(),
        );
    }

}
