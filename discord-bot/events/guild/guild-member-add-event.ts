import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class GuildMemberAddEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildMemberAddEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("guildMemberAdd", member => {

            });
    }

}
