import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class RoleUpdateEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${RoleUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("roleUpdate", (oldRole, newRole) => {

            });
    }

}
