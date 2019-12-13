import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class MessageReactionAddEvent extends ClientEvents {

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
