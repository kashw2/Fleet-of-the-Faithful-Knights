import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class PresenceUpdateEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${PresenceUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("presenceUpdate", (oldMember, newMember) => {

            });
    }

}
