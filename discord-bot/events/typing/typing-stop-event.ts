import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class TypingStopEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("typingStop", (channel, user) => {

            });
    }

}
