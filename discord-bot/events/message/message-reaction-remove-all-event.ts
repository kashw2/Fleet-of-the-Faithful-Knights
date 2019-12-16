import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class MessageReactionRemoveAllEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageReactionRemoveAllEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("messageReactionRemoveAll", message => {

            });
    }

}
