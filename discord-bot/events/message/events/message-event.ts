import {Client} from "discord.js";
import {None} from "funfix-core";
import {EmbedUserLeavingMessageCommand} from "../../../commands/embed-user-leaving-message-command";
import {EventManager} from "../../event-manager";

export class MessageEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("message", message => {
                if (message.author.bot) {
                } else {
                }
            });
    }

}
