import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class DisconnectEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${DisconnectEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("disconnect", event => {

            });
    }

}
