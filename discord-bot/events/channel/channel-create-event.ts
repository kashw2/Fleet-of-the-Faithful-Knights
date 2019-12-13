import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class ChannelCreateEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ChannelCreateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("channelCreate", channel => {

            });
    }

}
