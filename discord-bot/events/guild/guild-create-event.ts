import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class GuildCreateEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildCreateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("guildCreate", guild => {

            });
    }

}
