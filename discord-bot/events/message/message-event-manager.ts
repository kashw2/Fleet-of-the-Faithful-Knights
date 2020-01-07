import {Client} from "discord.js";
import {EventManager} from "../event-manager";
import {MessageDeleteBuildEvent} from "./events/message-delete-build-event";
import {MessageDeleteEvent} from "./events/message-delete-event";
import {MessageEvent} from "./events/message-event";
import {MessageReactionAddEvent} from "./events/message-reaction-add-event";
import {MessageReactionRemoveAllEvent} from "./events/message-reaction-remove-all-event";
import {MessageReactionRemoveEvent} from "./events/message-reaction-remove-event";
import {MessageUpdateEvent} from "./events/message-update-event";

export class MessageEventManager extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        new MessageEvent(this.clientManager.getClient()).initialiseEvent();
        new MessageDeleteEvent(this.clientManager.getClient()).initialiseEvent();
        new MessageDeleteBuildEvent(this.clientManager.getClient()).initialiseEvent();
        new MessageReactionAddEvent(this.clientManager.getClient()).initialiseEvent();
        new MessageReactionRemoveEvent(this.clientManager.getClient()).initialiseEvent();
        new MessageReactionRemoveAllEvent(this.clientManager.getClient()).initialiseEvent();
        new MessageUpdateEvent(this.clientManager.getClient()).initialiseEvent();
    }

}
