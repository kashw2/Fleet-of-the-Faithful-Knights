import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class ClientUserSettingsUpdateEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${ClientUserSettingsUpdateEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("clientUserSettingsUpdate", clientUserSettings => {

            });
    }

}
