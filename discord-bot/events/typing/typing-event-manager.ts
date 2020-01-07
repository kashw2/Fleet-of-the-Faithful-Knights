import {Client} from "discord.js";
import {EventManager} from "../event-manager";
import {TypingStartEvent} from "./events/typing-start-event";
import {TypingStopEvent} from "./events/typing-stop-event";

export class TypingEventManager extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        // new TypingStartEvent(this.clientManager.getClient()).initialiseEvent();
        // new TypingStopEvent(this.clientManager.getClient()).initialiseEvent();
    }

}
