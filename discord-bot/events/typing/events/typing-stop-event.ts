import {Client, TextChannel} from "discord.js";
import {EventManager} from "../../event-manager";

export class TypingStopEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("typingStop", (channel: TextChannel, user) => {
            });
    }

}
