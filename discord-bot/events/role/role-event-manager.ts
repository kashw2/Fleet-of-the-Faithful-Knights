import {Client} from "discord.js";
import {EventManager} from "../event-manager";
import {RoleCreateEvent} from "./events/role-create-event";
import {RoleDeleteEvent} from "./events/role-delete-event";
import {RoleUpdateEvent} from "./events/role-update-event";

export class RoleEventManager extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        new RoleCreateEvent(this.clientManager.getClient()).initialiseEvent();
        new RoleDeleteEvent(this.clientManager.getClient()).initialiseEvent();
        new RoleUpdateEvent(this.clientManager.getClient()).initialiseEvent();
    }

}
