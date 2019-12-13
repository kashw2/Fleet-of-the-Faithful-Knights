import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class WebhookUpdateEvent extends ClientEvents {

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
