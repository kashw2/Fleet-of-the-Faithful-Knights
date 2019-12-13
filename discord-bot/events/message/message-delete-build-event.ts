import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class MessageDeleteBuildEvent extends ClientEvents {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageDeleteBuildEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("messageDeleteBulk", messages => {

            });
    }

}
