import {Channel, Collection, Guild, GuildChannel, Message, Snowflake} from "discord.js";
import {Either} from "funfix-core";
import {EitherUtils} from "../../core/src";

export class ChannelUtils {

    static getChannelByIdFromMessage(message: Message, channels: Collection<Snowflake, GuildChannel>): Channel {
        return channels.get(message.channel.id)!;
    }

    static getChannelByNameFromGuild(name: string, guild: Guild): Channel {
        return guild.channels.find(x => x.name === name);
    }

    static getChannelByNameFromGuildChannels(name: string, channels: Collection<Snowflake, GuildChannel>): Channel {
        return channels.findAll("name", name)[0];
    }

    static getChannelIdByNameFromGuild(name: string, guild: Guild): Either<string, string> {
        return EitherUtils.liftEither(
            guild.channels.find(x => x.name === name).id,
            "Channel not found",
        );
    }

    static getChannelsByNameFromGuildChannels(name: string, channels: Collection<Snowflake, GuildChannel>): GuildChannel[] {
        return channels.findAll("name", name);
    }

}
