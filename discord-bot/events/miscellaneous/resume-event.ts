import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class ResumeEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ResumeEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("resume", replayed => {

            });
    }

}
