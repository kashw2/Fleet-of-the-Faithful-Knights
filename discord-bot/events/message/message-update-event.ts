import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class MessageUpdateEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("messageUpdate", (oldMessage, newMessage) => {

            });
    }

}
