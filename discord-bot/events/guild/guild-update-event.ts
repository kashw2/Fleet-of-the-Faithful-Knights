import {Client} from "discord.js";

import {EventManager} from "../event-manager";

export class GuildUpdateEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("guildUpdate", (oldGuild, newGuild) => {

            });
    }

}
