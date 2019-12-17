import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class RoleCreateEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${RoleCreateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("roleCreate", role => {

            });
    }

}
