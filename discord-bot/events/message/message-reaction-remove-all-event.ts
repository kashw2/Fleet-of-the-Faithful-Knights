import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class MessageReactionRemoveAllEvent extends ClientEvents {

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
