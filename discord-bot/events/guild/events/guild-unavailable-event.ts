import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class GuildUnavailableEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildUnavailableEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("guildUnavailable", guild => {

            });
    }

}
