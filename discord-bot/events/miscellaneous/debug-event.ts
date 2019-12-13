import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class DebugEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${DebugEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("debuig", () => {

            });
    }

}
