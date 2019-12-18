import {Client} from "discord.js";
import {EventManager} from "../../event-manager";
import {DeleteMessageCommand} from "../../../commands/delete-message-command";
import {Some} from "funfix-core";

export class MessageEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${MessageEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("message", message => {

                if (!message.content.startsWith("!")) {
                    return;
                }

                if (message.author.bot) {
                    return;
                }

                switch (message.content.toLowerCase().split(" ")[0]) {
                    case "!delete":
                        new DeleteMessageCommand(this.getClient(), Some(message)).run();
                        break;
                    default:
                        console.log(message.content);
                }
            });
    }

}
