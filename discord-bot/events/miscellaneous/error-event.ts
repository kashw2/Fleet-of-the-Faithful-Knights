import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class ErrorEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ErrorEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("error", error => {

            });
    }

}
