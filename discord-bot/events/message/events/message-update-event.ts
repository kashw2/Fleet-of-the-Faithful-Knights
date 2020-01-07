import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class MessageUpdateEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("messageUpdate", (oldMessage, newMessage) => {

            });
    }

}
