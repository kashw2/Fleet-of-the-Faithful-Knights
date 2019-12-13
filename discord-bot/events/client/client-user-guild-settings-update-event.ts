import {Client} from "discord.js";
import {ClientEvents} from "../client-events";

export class ClientUserGuildSettingsUpdateEvent extends ClientEvents {

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
