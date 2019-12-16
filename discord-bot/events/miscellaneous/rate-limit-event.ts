import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class RateLimitEvent extends EventManager {

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
