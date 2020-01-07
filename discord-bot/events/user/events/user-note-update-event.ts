import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class UserNoteUpdateEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${UserNoteUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("userNoteUpdate", (user, oldNote, newNote) => {

            });
    }

}
