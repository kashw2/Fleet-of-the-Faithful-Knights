import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class PresenceUpdateEvent extends ClientEvents {

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
