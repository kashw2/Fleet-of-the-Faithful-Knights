import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class GuildIntegrationsUpdateEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildIntegrationsUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("guildIntegrationsUpdate", guild => {

            });
    }

}
