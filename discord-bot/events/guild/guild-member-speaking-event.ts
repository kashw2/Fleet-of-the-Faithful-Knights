import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class GuildMemberSpeakingEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildMemberSpeakingEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("guildMemberSpeaking", (member, speaking) => {

            });
    }

}
