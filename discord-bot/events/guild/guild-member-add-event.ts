import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class GuildMemberAddEvent extends EventManager {

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
