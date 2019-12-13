import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class GuildUnavailableEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildUnavailableEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("guildUnavailable", guild => {

            });
    }

}
