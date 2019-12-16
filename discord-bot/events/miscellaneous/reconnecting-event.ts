import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class ReconnectingEvent extends EventManager {

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
