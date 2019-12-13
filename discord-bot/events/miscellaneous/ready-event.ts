import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class ReadyEvent extends ClientEvents {

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
