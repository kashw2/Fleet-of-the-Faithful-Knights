import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class GuildMemberRemoveEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildMemberRemoveEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("guildMemberRemove", member => {

            });
    }

}
