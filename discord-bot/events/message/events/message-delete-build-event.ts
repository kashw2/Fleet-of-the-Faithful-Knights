import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class MessageDeleteBuildEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageDeleteBuildEvent.name}`);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("messageDeleteBulk", messages => {

            });
    }

}
