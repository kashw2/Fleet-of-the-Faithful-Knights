import {Client, GuildMember, Message} from "discord.js";
import {None, Option, Some} from "funfix-core";
import {ChannelUtils} from "../utils/channel-utils";
import {CommandManager} from "./command-manager";

export class DeleteMessageCommand extends CommandManager {

    constructor(
        readonly client: Client,
        readonly message: Option<Message> = None,
    ) {
        super(client);
    }

    // TODO: Fix this if anything but a number is passed in
    private getNumberOfMessagesToDelete(): number {
        return this.message
            .flatMap(x => {
                if (x.content.split(" ").length > 1) {
                    return Some(+x.content.split(" ")[1]);
                }
                return Some(1);
            }).getOrElse(1);
    }

    hasPermission(guildMember: GuildMember): boolean {
        return guildMember.roles.some(x => {
            switch (x.name) {
                case "Grand Master":
                    return true;
                case "Master Commander":
                    return true;
                case "Knight Commander":
                    return true;
                case "Knight Lieutenant":
                    return true;
                case "..":
                    return true;
                case ".":
                    return true;
                default:
                    return false;
            }
        });
    }

    run(): void {
        this.message
            .map(m => {
                if (this.hasPermission(m.member)) {
                    this.getClientGuilds()
                        .filter(x => x.name === "bot")
                        .map(x => ChannelUtils.getChannelByIdFromMessage(m, x.channels))
                        .map(x => x.bulkDelete(this.getNumberOfMessagesToDelete()));
                }
            });
    }

}
