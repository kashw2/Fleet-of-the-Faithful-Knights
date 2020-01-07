import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class GuildMemberAvailableEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildMemberAvailableEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("guildMemberAvailable", member => {

            });
    }

}
