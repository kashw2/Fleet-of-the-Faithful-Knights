import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class ErrorEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ErrorEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("error", error => {

            });
    }

}
