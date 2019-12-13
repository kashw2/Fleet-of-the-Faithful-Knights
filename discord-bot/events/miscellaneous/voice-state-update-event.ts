import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class VoiceStateUpdateEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${VoiceStateUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("voiceStateUpdate", (oldMember, newMember) => {

            });
    }

}
