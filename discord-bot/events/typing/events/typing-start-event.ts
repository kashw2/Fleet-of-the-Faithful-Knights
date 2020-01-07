import {Client, TextChannel} from "discord.js";
import {EventManager} from "../../event-manager";

export class TypingStartEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("typingStart", (channel: TextChannel, user) => {
            });
    }

}
