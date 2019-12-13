import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class RoleCreateEvent extends ClientEvents {

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
