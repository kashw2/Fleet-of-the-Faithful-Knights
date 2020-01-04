import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class RoleDeleteEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${RoleDeleteEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("roleDelete", role => {

            });
    }

}
