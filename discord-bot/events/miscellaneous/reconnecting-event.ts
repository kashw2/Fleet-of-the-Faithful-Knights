import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class ReconnectingEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ReconnectingEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("reconnecting", () => {

            });
    }

}
