import {Client} from "discord.js";
import {ChannelEventManager} from "./channel/channel-event-manager";
import {ClientEventManager} from "./client/client-event-manager";
import {EmojiEventManager} from "./emoji/emoji-event-manager";
import {GuildEventManager} from "./guild/guild-event-manager";
import {MessageEventManager} from "./message/message-event-manager";
import {MiscellaneousEventManager} from "./miscellaneous/miscellaneous-event-manager";
import {RoleEventManager} from "./role/role-event-manager";
import {TypingStartEvent} from "./typing/typing-start-event";
import {TypingStopEvent} from "./typing/typing-stop-event";
import {UserNoteUpdateEvent} from "./user/user-note-update-event";
import {UserUpdateEvent} from "./user/user-update-event";
import {TypingEventManager} from "./typing/typing-event-manager";
import {UserEventManager} from "./user/user-event-manager";

export class Events {

    static startAllDiscordEvents(client: Client): void {
        // Misc Events
        new MiscellaneousEventManager(client).initialiseEvent();
        // Message Events
        new MessageEventManager(client).initialiseEvent();
        // Channel Events
        new ChannelEventManager(client).initialiseEvent();
        // Client Events
        new ClientEventManager(client).initialiseEvent();
        // Guild Events
        new GuildEventManager(client).initialiseEvent();
        // Emoji Events
        new EmojiEventManager(client).initialiseEvent();
        // Role Events
        new RoleEventManager(client).initialiseEvent();
        // Typing Events
        new TypingEventManager(client).initialiseEvent();
        // User Events
        new UserEventManager(client).initialiseEvent();
    }

}
