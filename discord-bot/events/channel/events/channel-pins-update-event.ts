import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class ChannelPinsUpdateEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ChannelPinsUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("channelPinsUpdate", (channel, time) => {

            });
    }
}
