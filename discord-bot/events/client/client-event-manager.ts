import {Client} from "discord.js";
import {EventManager} from "../event-manager";
import {ClientUserGuildSettingsUpdateEvent} from "./events/client-user-guild-settings-update-event";
import {ClientUserSettingsUpdateEvent} from "./events/client-user-settings-update-event";

export class ClientEventManager extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        new ClientUserSettingsUpdateEvent(this.clientManager.getClient()).initialiseEvent();
        new ClientUserGuildSettingsUpdateEvent(this.clientManager.getClient()).initialiseEvent();
    }

}
