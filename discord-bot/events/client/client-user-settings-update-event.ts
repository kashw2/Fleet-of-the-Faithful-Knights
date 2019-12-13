import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class ClientUserSettingsUpdateEvent extends ClientEvents {

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
