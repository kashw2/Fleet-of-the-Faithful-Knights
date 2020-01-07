import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class EmojiDeleteEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${EmojiDeleteEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("emojiDelete", emoji => {

            });
    }

}
