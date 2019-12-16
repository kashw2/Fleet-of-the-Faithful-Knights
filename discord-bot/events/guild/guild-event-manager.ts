import {Client} from "discord.js";
import {EventManager} from "../event-manager";
import {GuildBanAddEvent} from "./events/guild-ban-add-event";
import {GuildBanRemoveEvent} from "./events/guild-ban-remove-event";
import {GuildCreateEvent} from "./events/guild-create-event";
import {GuildDeleteEvent} from "./events/guild-delete-event";
import {GuildIntegrationsUpdateEvent} from "./events/guild-integrations-update-event";
import {GuildMemberAddEvent} from "./events/guild-member-add-event";
import {GuildMemberAvailableEvent} from "./events/guild-member-available-event";
import {GuildMemberRemoveEvent} from "./events/guild-member-remove-event";
import {GuildMemberSpeakingEvent} from "./events/guild-member-speaking-event";
import {GuildMemberUpdateEndpoint} from "./events/guild-member-update-endpoint";
import {GuildMembersChunkEvent} from "./events/guild-members-chunk-event";
import {GuildUnavailableEvent} from "./events/guild-unavailable-event";
import {GuildUpdateEvent} from "./events/guild-update-event";

export class GuildEventManager extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        new GuildBanAddEvent(this.getClient()).initialiseEvent();
        new GuildBanRemoveEvent(this.getClient()).initialiseEvent();
        new GuildCreateEvent(this.getClient()).initialiseEvent();
        new GuildDeleteEvent(this.getClient()).initialiseEvent();
        new GuildIntegrationsUpdateEvent(this.getClient()).initialiseEvent();
        new GuildMemberAddEvent(this.getClient()).initialiseEvent();
        new GuildMemberAvailableEvent(this.getClient()).initialiseEvent();
        new GuildMemberAvailableEvent(this.getClient()).initialiseEvent();
        new GuildMemberRemoveEvent(this.getClient()).initialiseEvent();
        new GuildMemberSpeakingEvent(this.getClient()).initialiseEvent();
        new GuildMemberUpdateEndpoint(this.getClient()).initialiseEvent();
        new GuildMembersChunkEvent(this.getClient()).initialiseEvent();
        new GuildUnavailableEvent(this.getClient()).initialiseEvent();
        new GuildUpdateEvent(this.getClient()).initialiseEvent();
    }

}
