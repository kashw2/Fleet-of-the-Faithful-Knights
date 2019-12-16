import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class GuildDeleteEvent extends EventManager {

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
