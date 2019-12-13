import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class GuildBanRemoveEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildBanRemoveEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("guildBanRemove", (guild, user) => {

            });
    }

}
