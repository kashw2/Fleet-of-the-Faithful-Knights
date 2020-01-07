import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class GuildMemberUpdateEndpoint extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildMemberUpdateEndpoint.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("guildMemberUpdate", (oldMember, newMember) => {

            });
    }

}
