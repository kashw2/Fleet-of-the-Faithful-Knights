import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class UserNoteUpdateEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${UserNoteUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("userNoteUpdate", (user, oldNote, newNote) => {

            });
    }

}
