import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class MessageDeleteEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageDeleteEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("messageDelete", message => {

            });
    }

}
