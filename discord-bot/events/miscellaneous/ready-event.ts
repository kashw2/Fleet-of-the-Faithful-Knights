import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class ReadyEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ReadyEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("ready", () => {
                console.log(`Logged in as ${this.getClientTag()}`);
            });
    }

}
