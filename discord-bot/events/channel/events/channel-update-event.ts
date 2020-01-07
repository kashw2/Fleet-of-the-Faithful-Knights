import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class ChannelUpdateEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ChannelUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("channelUpdate", (oldChannel, newChannel) => {

            });
    }

}
