import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class TypingStartEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("typingStart", (channel, user) => {

            });
    }

}
