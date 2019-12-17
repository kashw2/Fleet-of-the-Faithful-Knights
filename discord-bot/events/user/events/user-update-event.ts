import {Client} from "discord.js";
import {EventManager} from "../../event-manager";

export class UserUpdateEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("userUpdate", (oldUser, newUser) => {

            });
    }

}
