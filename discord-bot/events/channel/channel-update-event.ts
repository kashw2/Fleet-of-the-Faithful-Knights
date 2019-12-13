import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class ChannelUpdateEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ChannelUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("channelUpdate", (oldChannel, newChannel) => {

            });
    }

}
