import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class DisconnectEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${DisconnectEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("disconnect", event => {

            });
    }

}
