import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class GuildDeleteEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildDeleteEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("guildDelete", guild => {

            });
    }

}
