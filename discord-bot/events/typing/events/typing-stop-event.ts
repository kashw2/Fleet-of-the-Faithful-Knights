import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class TypingStopEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("typingStop", (channel, user) => {

            });
    }

}
