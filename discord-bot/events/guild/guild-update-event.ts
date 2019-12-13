import {Client} from "discord.js";

import {ClientEvents} from "../client-events";

export class GuildUpdateEvent extends ClientEvents {

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
