import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class EmojiUpdateEvent extends EventManager {

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
