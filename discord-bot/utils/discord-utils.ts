import {Channel, Collection, GuildChannel, Snowflake} from "discord.js";
import {Either} from "funfix-core";
import {ChannelUtils} from "./channel-utils";

export type Primitive = string | number | boolean;

export class DiscordUtils {

    static deleteMessageOrError(channel: Channel, message: Either<string, Primitive>): void {
        if (channel === undefined || null) {
            return;
        }

        if (message.isLeft()) {
            channel.send(message.value);
            return;
        }
        channel.send(`Deleted ${message.get()} messages}`);
        channel.bulkDelete(message.get());
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
