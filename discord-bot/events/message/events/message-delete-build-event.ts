import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class MessageDeleteBuildEvent extends EventManager {

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
