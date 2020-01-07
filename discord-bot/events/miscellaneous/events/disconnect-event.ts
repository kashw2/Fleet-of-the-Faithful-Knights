import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class DisconnectEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${DisconnectEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("disconnect", event => {

            });
    }

}
