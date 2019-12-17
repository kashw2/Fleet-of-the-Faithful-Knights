import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class VoiceStateUpdateEvent extends EventManager {

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
