import {Client, GuildMember, RichEmbed} from "discord.js";
import {None, Option} from "funfix-core";
import {leavingGreetingLogsKey} from "../../core/keys/discord-channel-keys";
import {ChannelUtils} from "../utils/channel-utils";
import {CommandManager} from "./command-manager";

export class EmbedUserLeavingMessageCommand extends CommandManager {

    constructor(
        readonly client: Client,
        readonly member: Option<GuildMember> = None,
    ) {
        super(client);
    }

    private getEmbeddedAuthor(): string {
        return "Leaving Notification";
    }

    private getEmbeddedDescription(): string {
        return "We're sad to see them go!";
    }

    private getEmbeddedFirstSeenText(): string {
        return this.member
            .map(x => x.joinedAt.toDateString())
            .getOrElse("Unknown");
    }

    private getEmbeddedMessage(): RichEmbed {
        return new RichEmbed()
            .setAuthor(this.getEmbeddedAuthor())
            .setTitle(this.getEmbeddedTitle())
            .setDescription(this.getEmbeddedDescription())
            .setThumbnail(this.getEmbeddedUserAvartarUrl())
            .addBlankField()
            .addField("First Seen", this.getEmbeddedFirstSeenText())
            .addField("Last seen", new Date().toLocaleDateString("en-US"))
            .setTimestamp(new Date());
    }

    private getEmbeddedTitle(): string {
        return `${this.member
            .map(x => x.user.tag)
            .getOrElse("Unknown User")} has left`;
    }

    private getEmbeddedUserAvartarUrl(): string {
        return this.member
            .map(x => x.user.displayAvatarURL)
            .getOrElse("https://i.imgur.com/yH58efA.png");
    }

    hasPermission(): boolean {
        return true;
    }

    run(): void {
        this.member
            .map(m => {
                if (this.hasPermission()) {
                    this.guildManager.getClientGuilds()
                        .filter(x => x.name === this.getDevEnvironment())
                        .map(x => ChannelUtils.getChannelByNameFromGuild(leavingGreetingLogsKey, x))
                        .map(x => x.send(this.getEmbeddedMessage()));
                }
            });
    }

}
