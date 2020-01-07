import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class GuildMemberSpeakingEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildMemberSpeakingEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("guildMemberSpeaking", (member, speaking) => {

            });
    }

}
