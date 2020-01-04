import {Emoji, Guild, Message} from "discord.js";
import {Either, Left, Right} from "funfix-core";

export class EmojiUtils {

    static getEmojiByIdFromMessage(id: string, message: Message): Emoji {
        return message.guild.emojis.get(id)!;
    }

    static getEmojiByNameFromGuild(name: string, guild: Guild): Emoji {
        return guild.emojis.find("name", name);
    }

    static getEmojiByNameFromGuildEither(name: string, guild: Guild): Either<string, Emoji> {
        if (guild.emojis.exists("name", name)) {
            return Right(guild.emojis.find("name", name));
        }
        return Left("Emoji not found");
    }

}
