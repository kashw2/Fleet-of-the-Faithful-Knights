import {Client, GuildMember, TextChannel} from "discord.js";
import {CommandManager} from "./command-manager";

export class RemoveWatchingReactionCommand extends CommandManager {

    constructor(
        readonly channel: TextChannel,
        readonly client: Client,
    ) {
        super(client);
    }

    hasPermission(guildMember: GuildMember): boolean {
        return true;
    }

    // TODO: Async await this shit
    // TODO: This will probably break if too many messages are sent
    run(): void {
        this.channel.fetchMessages()
            .then(x => x.forEach(v => v.reactions.find(value => value.me).remove()));
    }

}
