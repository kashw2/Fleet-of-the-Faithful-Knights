import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class MessageReactionRemoveAllEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageReactionRemoveAllEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("messageReactionRemoveAll", message => {

            });
    }

}
