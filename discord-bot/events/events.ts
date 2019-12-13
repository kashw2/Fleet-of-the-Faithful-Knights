import {Client} from "discord.js";
import {ChannelCreateEvent} from "./channel/channel-create-event";
import {ChannelDeleteEvent} from "./channel/channel-delete-event";
import {ChannelPinsUpdateEvent} from "./channel/channel-pins-update-event";
import {ChannelUpdateEvent} from "./channel/channel-update-event";
import {ClientUserGuildSettingsUpdateEvent} from "./client/client-user-guild-settings-update-event";
import {ClientUserSettingsUpdateEvent} from "./client/client-user-settings-update-event";
import {EmojiCreateEvent} from "./emoji/emoji-create-event";
import {EmojiDeleteEvent} from "./emoji/emoji-delete-event";
import {EmojiUpdateEvent} from "./emoji/emoji-update-event";
import {GuildBanAddEvent} from "./guild/guild-ban-add-event";
import {GuildBanRemoveEvent} from "./guild/guild-ban-remove-event";
import {GuildCreateEvent} from "./guild/guild-create-event";
import {GuildDeleteEvent} from "./guild/guild-delete-event";
import {GuildIntegrationsUpdateEvent} from "./guild/guild-integrations-update-event";
import {GuildMemberAddEvent} from "./guild/guild-member-add-event";
import {GuildMemberAvailableEvent} from "./guild/guild-member-available-event";
import {GuildMemberRemoveEvent} from "./guild/guild-member-remove-event";
import {GuildMemberSpeakingEvent} from "./guild/guild-member-speaking-event";
import {GuildMemberUpdateEndpoint} from "./guild/guild-member-update-endpoint";
import {GuildMembersChunkEvent} from "./guild/guild-members-chunk-event";
import {GuildUnavailableEvent} from "./guild/guild-unavailable-event";
import {GuildUpdateEvent} from "./guild/guild-update-event";
import {MessageDeleteBuildEvent} from "./message/message-delete-build-event";
import {MessageDeleteEvent} from "./message/message-delete-event";
import {MessageEvent} from "./message/message-event";
import {MessageReactionAddEvent} from "./message/message-reaction-add-event";
import {MessageReactionRemoveAllEvent} from "./message/message-reaction-remove-all-event";
import {MessageReactionRemoveEvent} from "./message/message-reaction-remove-event";
import {MessageUpdateEvent} from "./message/message-update-event";
import {DebugEvent} from "./miscellaneous/debug-event";
import {DisconnectEvent} from "./miscellaneous/disconnect-event";
import {ErrorEvent} from "./miscellaneous/error-event";
import {PresenceUpdateEvent} from "./miscellaneous/presence-update-event";
import {RateLimitEvent} from "./miscellaneous/rate-limit-event";
import {ReadyEvent} from "./miscellaneous/ready-event";
import {ReconnectingEvent} from "./miscellaneous/reconnecting-event";
import {ResumeEvent} from "./miscellaneous/resume-event";
import {VoiceStateUpdateEvent} from "./miscellaneous/voice-state-update-event";
import {WarnEvent} from "./miscellaneous/warn-event";
import {WebhookUpdateEvent} from "./miscellaneous/webhook-update-event";
import {RoleCreateEvent} from "./role/role-create-event";
import {RoleDeleteEvent} from "./role/role-delete-event";
import {RoleUpdateEvent} from "./role/role-update-event";
import {TypingStartEvent} from "./typing/typing-start-event";
import {TypingStopEvent} from "./typing/typing-stop-event";
import {UserNoteUpdateEvent} from "./user/user-note-update-event";
import {UserUpdateEvent} from "./user/user-update-event";

export class Events {

    static startAllDiscordEvents(client: Client): void {
        // Misc Events
        new ReadyEvent(client).initialiseEvent();
        new DebugEvent(client).initialiseEvent();
        new ErrorEvent(client).initialiseEvent();
        new PresenceUpdateEvent(client).initialiseEvent();
        new RateLimitEvent(client).initialiseEvent();
        new DisconnectEvent(client).initialiseEvent();
        new ReconnectingEvent(client).initialiseEvent();
        new ResumeEvent(client).initialiseEvent();
        new VoiceStateUpdateEvent(client).initialiseEvent();
        new WarnEvent(client).initialiseEvent();
        new WebhookUpdateEvent(client).initialiseEvent();
        // Message Events
        new MessageEvent(client).initialiseEvent();
        new MessageDeleteEvent(client).initialiseEvent();
        new MessageDeleteBuildEvent(client).initialiseEvent();
        new MessageReactionAddEvent(client).initialiseEvent();
        new MessageReactionRemoveEvent(client).initialiseEvent();
        new MessageReactionRemoveAllEvent(client).initialiseEvent();
        new MessageUpdateEvent(client).initialiseEvent();
        // Channel Events
        new ChannelCreateEvent(client).initialiseEvent();
        new ChannelDeleteEvent(client).initialiseEvent();
        new ChannelPinsUpdateEvent(client).initialiseEvent();
        new ChannelUpdateEvent(client).initialiseEvent();
        // Client Events
        new ClientUserGuildSettingsUpdateEvent(client).initialiseEvent();
        new ClientUserSettingsUpdateEvent(client).initialiseEvent();
        // Guild Events
        new GuildBanAddEvent(client).initialiseEvent();
        new GuildBanRemoveEvent(client).initialiseEvent();
        new GuildCreateEvent(client).initialiseEvent();
        new GuildDeleteEvent(client).initialiseEvent();
        new GuildIntegrationsUpdateEvent(client).initialiseEvent();
        new GuildMemberAddEvent(client).initialiseEvent();
        new GuildMemberAvailableEvent(client).initialiseEvent();
        new GuildMemberAvailableEvent(client).initialiseEvent();
        new GuildMemberRemoveEvent(client).initialiseEvent();
        new GuildMemberSpeakingEvent(client).initialiseEvent();
        new GuildMemberUpdateEndpoint(client).initialiseEvent();
        new GuildMembersChunkEvent(client).initialiseEvent();
        new GuildUnavailableEvent(client).initialiseEvent();
        new GuildUpdateEvent(client).initialiseEvent();
        // Emoji Events
        new EmojiCreateEvent(client).initialiseEvent();
        new EmojiDeleteEvent(client).initialiseEvent();
        new EmojiUpdateEvent(client).initialiseEvent();
        // Role Events
        new RoleCreateEvent(client).initialiseEvent();
        new RoleDeleteEvent(client).initialiseEvent();
        new RoleUpdateEvent(client).initialiseEvent();
        // Typing Events
        new TypingStartEvent(client).initialiseEvent();
        new TypingStopEvent(client).initialiseEvent();
        // User Events
        new UserNoteUpdateEvent(client).initialiseEvent();
        new UserUpdateEvent(client).initialiseEvent();
    }

}
