import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class MessageReactionAddEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageReactionAddEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("messageReactionAdd", (messageReaction, user) => {

            });
    }

}
