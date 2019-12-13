import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class RateLimitEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${RateLimitEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("rateLimit", rateLimit => {

            });
    }

}
