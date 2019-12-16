import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class ResumeEvent extends EventManager {

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
