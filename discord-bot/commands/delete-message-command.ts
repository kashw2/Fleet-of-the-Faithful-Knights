import {Client, GuildMember, Message} from "discord.js";
import {Either, Left, None, Option, Right} from "funfix-core";
import {EitherUtils} from "../../core";
import {ChannelUtils} from "../utils/channel-utils";
import {DiscordUtils} from "../utils/discord-utils";
import {CommandManager} from "./command-manager";

export class DeleteMessageCommand extends CommandManager {

    constructor(
        readonly client: Client,
        readonly message: Option<Message> = None,
    ) {
        super(client);
    }

    run(): void {
        this.message
            .map(m => {
                if (this.hasPermission(m.member)) {
                    this.getClientGuilds()
                        .filter(x => x.name === this.getDevEnvironment())
                        .map(x => ChannelUtils.getChannelByIdFromMessage(m, x.channels))
                        .map(x => DiscordUtils.deleteMessageOrError(x, this.getNumberOfMessagesToDelete()));
                }
            });
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

    private getNumberOfMessagesToDelete(): Either<string, number> {
        return EitherUtils.toEither(this.message, "Message was not provided")
            .flatMap(x => {
                if (x.content.split(" ").length > 1) {
                    // @ts-ignore
                    if (!isNaN(x.content.split(" ")[1])) {
                        return Right(+x.content.split(" ")[1]);
                    }
                    return Left(`Expected a number as second parameter but got ${typeof +x.content.split(" ")[1]}`);
                }
                return Left("You must imput a number of messages to delete");
            });
    }

}
