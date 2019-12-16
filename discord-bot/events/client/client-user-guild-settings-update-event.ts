import {Client} from "discord.js";
import {EventManager} from "../event-manager";

export class ClientUserGuildSettingsUpdateEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ClientUserGuildSettingsUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("clientUserGuildSettingsUpdate", clientUserGuildSettings => {

            });
    }

}
