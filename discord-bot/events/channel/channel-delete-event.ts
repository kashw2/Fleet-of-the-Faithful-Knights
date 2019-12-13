import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class ChannelDeleteEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ChannelDeleteEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("channelDelete", channel => {

            });
    }
}
