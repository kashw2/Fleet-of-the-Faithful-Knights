import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class WarnEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${WarnEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("warn", info => {

            });
    }

}
