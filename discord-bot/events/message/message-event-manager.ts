import {Client} from "discord.js";
import {EventManager} from "../event-manager";
import {MessageEvent} from "./events/message-event";
import {MessageDeleteBuildEvent} from "./events/message-delete-build-event";
import {MessageDeleteEvent} from "./events/message-delete-event";
import {MessageReactionAddEvent} from "./events/message-reaction-add-event";
import {MessageReactionRemoveAllEvent} from "./events/message-reaction-remove-all-event";
import {MessageReactionRemoveEvent} from "./events/message-reaction-remove-event";
import {MessageUpdateEvent} from "./events/message-update-event";

export class MessageEventManager extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        new MessageEvent(this.getClient()).initialiseEvent();
        new MessageDeleteEvent(this.getClient()).initialiseEvent();
        new MessageDeleteBuildEvent(this.getClient()).initialiseEvent();
        new MessageReactionAddEvent(this.getClient()).initialiseEvent();
        new MessageReactionRemoveEvent(this.getClient()).initialiseEvent();
        new MessageReactionRemoveAllEvent(this.getClient()).initialiseEvent();
        new MessageUpdateEvent(this.getClient()).initialiseEvent();
    }

}
