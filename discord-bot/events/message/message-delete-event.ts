import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class MessageDeleteEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageDeleteEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("messageDelete", message => {

            });
    }

}
