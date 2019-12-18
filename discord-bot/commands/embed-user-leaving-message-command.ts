import {Client, GuildChannel, GuildMember, RichEmbed} from "discord.js";
import {None, Option} from "funfix-core";
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
        return `${this.member.getOrElse("Unknown User")} has left`;
    }

    private getEmbeddedUserAvartarUrl(): string {
        return this.member
            .map(x => x.user.displayAvatarURL)
            .getOrElse("https://i.imgur.com/yH58efA.png");
    }

    hasPermission(guildMember: GuildMember): boolean {
        return guildMember.user.bot;
    }

    run(): void {
        this.member
            .map(m => {
                if (this.hasPermission(m)) {
                    this.getClientGuilds()
                        .filter(x => x.name === "bot")
                        .map(x => x.channels.get("656439325096935457"))
                        // @ts-ignore
                        .map((x: GuildChannel) => x.send(this.getEmbeddedMessage()));
                }
            });
    }

}
