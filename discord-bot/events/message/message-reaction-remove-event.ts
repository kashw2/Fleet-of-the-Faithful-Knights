import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class MessageReactionRemoveEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageReactionRemoveEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("messageReactionRemove", (messageReaction, user) => {

            });
    }

}
