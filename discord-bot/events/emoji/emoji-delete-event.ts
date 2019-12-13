import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class EmojiDeleteEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${EmojiDeleteEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("emojiDelete", emoji => {

            });
    }

}
