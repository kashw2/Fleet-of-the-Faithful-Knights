import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class GuildBanRemoveEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildBanRemoveEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("guildBanRemove", (guild, user) => {

            });
    }

}
