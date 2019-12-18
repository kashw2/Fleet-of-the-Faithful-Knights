import {Client, GuildMember} from "discord.js";
import {Manager} from "../manager";

export abstract class CommandManager extends Manager {

    constructor(readonly client: Client) {
        super(client);
    }

    abstract hasPermission(guildMember: GuildMember): boolean;

    abstract run(): void;

}
