import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class GuildIntegrationsUpdateEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildIntegrationsUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("guildIntegrationsUpdate", guild => {

            });
    }

}
