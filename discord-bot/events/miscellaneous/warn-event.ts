import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class WarnEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${WarnEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("warn", info => {

            });
    }

}
