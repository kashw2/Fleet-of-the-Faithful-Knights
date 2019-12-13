import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class MessageEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("message", message => {
                console.log("Hello world");
            });
    }

}
