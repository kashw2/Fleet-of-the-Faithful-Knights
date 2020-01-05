import {Channel, Collection, GuildChannel, Snowflake} from "discord.js";
import {Either} from "funfix-core";
import {ChannelUtils} from "./channel-utils";

export type Primitive = string | number | boolean;

export class DiscordUtils {

    static deleteMessageOrError(channel: Channel, message: Either<string, Primitive>): void {
        // This should only happen if the bot is in dev mode and the channel is live
        if (channel === undefined || null) {
            return;
        }

        if (message.isLeft()) {
            channel.send(message.value);
            return;
        }
        channel.bulkDelete(message.get());
        channel.send(`Deleted ${message.get()} messages`);
        return;
    }

    static sendMessage(channel: Channel, message: Either<string, Primitive>): void {
        if (message.isLeft()) {
            channel.send(message.value);
            return;
        }
        channel.send(message.get());
        return;
    }

    static sendMessageToChannel(channels: Collection<Snowflake, GuildChannel>, channelName: string, message: Either<string, Primitive>): void {
        ChannelUtils.getChannelByNameFromGuildChannels(channelName, channels)
            .send(message);
    }

}
