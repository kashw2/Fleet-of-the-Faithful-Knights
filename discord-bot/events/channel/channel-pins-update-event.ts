import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class ChannelPinsUpdateEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ChannelPinsUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("channelPinsUpdate", (channel, time) => {

            });
    }
}
