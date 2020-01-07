import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class MessageReactionRemoveEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageReactionRemoveEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("messageReactionRemove", (messageReaction, user) => {

            });
    }

}
