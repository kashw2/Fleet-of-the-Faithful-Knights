import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class GuildBanAddEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildBanAddEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("guildBanAdd", (guild, user) => {

            });
    }

}
