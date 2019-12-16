import {Client} from "discord.js";
import {EventManager} from "../event-manager";
import {UserNoteUpdateEvent} from "./events/user-note-update-event";
import {UserUpdateEvent} from "./events/user-update-event";

export class UserEventManager extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        new UserNoteUpdateEvent(this.getClient()).initialiseEvent();
        new UserUpdateEvent(this.getClient()).initialiseEvent();
    }

}
