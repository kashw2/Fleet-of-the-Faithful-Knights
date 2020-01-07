import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class ChannelCreateEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ChannelCreateEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("channelCreate", channel => {

            });
    }

}
