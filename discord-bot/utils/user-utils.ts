import {GuildMember, Message, User} from "discord.js";

export class UserUtils {

    static getMemberFromMessage(message: Message): GuildMember {
        return message.member;
    }

    static getUserFromMember(member: GuildMember): User {
        return member.user;
    }

    static getUserFromMessage(message: Message): User {
        return message.member.user;
    }

}
