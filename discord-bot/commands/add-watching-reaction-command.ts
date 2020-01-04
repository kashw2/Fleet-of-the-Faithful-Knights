import {Client, Guild, GuildMember, Message, TextChannel} from "discord.js";
import {CommandManager} from "./command-manager";

export class AddWatchingReactionCommand extends CommandManager {

    constructor(
        readonly channel: TextChannel,
        readonly client: Client,
    ) {
        super(client);
    }

    hasPermission(guildMember: GuildMember): boolean {
        return true;
    }

    // Emoji not visible in WebStorm
    run(): void {
        this.getLastMessage()
            .then(m => m.react("👀"))
            .catch(e => console.log(e));
    }

    private getGuild(): Guild {
        return this.channel.guild;
    }

    private getLastMessage(): Promise<Message> {
        return this.channel.fetchMessage(this.getLastMessageId());
    }

    private getLastMessageId(): string {
        return this.channel.lastMessageID;
    }

}
