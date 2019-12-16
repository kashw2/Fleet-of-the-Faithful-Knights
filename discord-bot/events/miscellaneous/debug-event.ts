import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class DebugEvent extends EventManager {

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
