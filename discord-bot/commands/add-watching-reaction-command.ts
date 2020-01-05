import {Client, Message, TextChannel} from "discord.js";
import {CommandManager} from "./command-manager";
import {ChannelUtils} from "../utils/channel-utils";

export class AddWatchingReactionCommand extends CommandManager {

    constructor(
        readonly channel: TextChannel,
        readonly client: Client,
    ) {
        super(client);
    }

    private getLastMessage(): Promise<Message> {
        return this.channel.fetchMessage(this.getLastMessageId());
    }

    private getLastMessageId(): string {
        return this.channel.lastMessageID;
    }

    hasPermission(): boolean {
        return true;
    }

    // Emoji not visible in WebStorm
    run(): void {
        this.getLastMessage()
            .then(m => {
                if (this.hasPermission()) {
                    this.getClientGuilds()
                        .filter(x => x.name === this.getDevEnvironment())
                        .map(x => ChannelUtils.getChannelByIdFromMessage(m, x.channels))
                        .map(x => m.react("👀"));
                }
            })
            .catch(e => console.log(e));
    }

}
