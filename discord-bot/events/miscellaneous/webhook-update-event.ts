import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class WebhookUpdateEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${WebhookUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("webhookUpdate", channel => {

            });
    }

}
