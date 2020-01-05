import {Client, GuildMember} from "discord.js";
import {Manager} from "../manager";

export abstract class CommandManager extends Manager {

    constructor(readonly client: Client) {
        super(client);
    }

    getDevEnvironment(): string {
        if (this.isDevEnvironment()) {
            return "bot";
        }
        return "Fleet of the Faithful Knights";
    }

    abstract hasPermission(): boolean;

    private isDevEnvironment(): boolean {
        return process.env.FFK_DISCORD_BOT_MODE === "dev";
    }

    abstract run(): void;

}
