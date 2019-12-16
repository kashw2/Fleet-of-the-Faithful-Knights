import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class GuildMembersChunkEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildMembersChunkEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("guildMembersChunk", (members, guild) => {

            });
    }

}
