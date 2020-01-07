import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class ChannelDeleteEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ChannelDeleteEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("channelDelete", channel => {

            });
    }
}
