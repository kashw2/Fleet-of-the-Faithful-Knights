import {Client} from "discord.js";
import {EventManager} from "../event-manager";
import {ChannelCreateEvent} from "./channel-create-event";
import {ChannelDeleteEvent} from "./channel-delete-event";
import {ChannelPinsUpdateEvent} from "./channel-pins-update-event";
import {ChannelUpdateEvent} from "./channel-update-event";

export class ChannelEventManager extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        new ChannelCreateEvent(this.getClient()).initialiseEvent();
        new ChannelDeleteEvent(this.getClient()).initialiseEvent();
        new ChannelPinsUpdateEvent(this.getClient()).initialiseEvent();
        new ChannelUpdateEvent(this.getClient()).initialiseEvent();
    }

}
