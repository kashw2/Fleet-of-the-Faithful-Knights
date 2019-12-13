import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class EmojiUpdateEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${EmojiUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("emojiUpdate", (oldEmoji, newEmoji) => {

            });
    }

}
