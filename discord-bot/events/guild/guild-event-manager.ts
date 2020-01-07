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
        new GuildBanAddEvent(this.clientManager.getClient()).initialiseEvent();
        new GuildBanRemoveEvent(this.clientManager.getClient()).initialiseEvent();
        new GuildCreateEvent(this.clientManager.getClient()).initialiseEvent();
        new GuildDeleteEvent(this.clientManager.getClient()).initialiseEvent();
        new GuildIntegrationsUpdateEvent(this.clientManager.getClient()).initialiseEvent();
        new GuildMemberAddEvent(this.clientManager.getClient()).initialiseEvent();
        new GuildMemberAvailableEvent(this.clientManager.getClient()).initialiseEvent();
        new GuildMemberAvailableEvent(this.clientManager.getClient()).initialiseEvent();
        new GuildMemberRemoveEvent(this.clientManager.getClient()).initialiseEvent();
        new GuildMemberSpeakingEvent(this.clientManager.getClient()).initialiseEvent();
        new GuildMemberUpdateEndpoint(this.clientManager.getClient()).initialiseEvent();
        new GuildMembersChunkEvent(this.clientManager.getClient()).initialiseEvent();
        new GuildUnavailableEvent(this.clientManager.getClient()).initialiseEvent();
        new GuildUpdateEvent(this.clientManager.getClient()).initialiseEvent();
    }

}
