import {EventManager} from "../event-manager";
import {Client} from "discord.js";
import {RoleCreateEvent} from "./role-create-event";
import {RoleDeleteEvent} from "./role-delete-event";
import {RoleUpdateEvent} from "./role-update-event";

export class RoleEventManager extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        new RoleCreateEvent(this.getClient()).initialiseEvent();
        new RoleDeleteEvent(this.getClient()).initialiseEvent();
        new RoleUpdateEvent(this.getClient()).initialiseEvent();
    }

}
