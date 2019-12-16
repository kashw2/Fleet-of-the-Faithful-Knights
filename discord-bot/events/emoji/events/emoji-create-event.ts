import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class EmojiCreateEvent extends EventManager {

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
