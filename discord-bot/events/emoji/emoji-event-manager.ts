import {Client} from "discord.js";
import {EventManager} from "../event-manager";
import {EmojiCreateEvent} from "./events/emoji-create-event";
import {EmojiDeleteEvent} from "./events/emoji-delete-event";
import {EmojiUpdateEvent} from "./events/emoji-update-event";

export class EmojiEventManager extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        new EmojiCreateEvent(this.getClient()).initialiseEvent();
        new EmojiDeleteEvent(this.getClient()).initialiseEvent();
        new EmojiUpdateEvent(this.getClient()).initialiseEvent();
    }

}
