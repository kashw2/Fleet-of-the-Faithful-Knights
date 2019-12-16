import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class MessageEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("message", message => {

            });
    }

}
