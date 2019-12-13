import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class RoleDeleteEvent extends ClientEvents {

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
