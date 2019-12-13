import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class GuildMemberAvailableEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildMemberAvailableEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("guildMemberAvailable", member => {

            });
    }

}
