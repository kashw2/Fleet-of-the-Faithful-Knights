import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class EmojiCreateEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${EmojiCreateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("emojiCreate", clientUserGuildSettings => {

            });
    }

}
