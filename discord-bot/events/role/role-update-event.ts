import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class RoleUpdateEvent extends ClientEvents {

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
