import {Guild, Message} from "discord.js";

export class GuildUtils {

    static getGuildFromMessage(message: Message): Guild {
        return message.guild;
    }

}
