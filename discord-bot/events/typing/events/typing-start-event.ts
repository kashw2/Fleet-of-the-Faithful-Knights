import {Client, TextChannel} from "discord.js";
import {AddWatchingReactionCommand} from "../../../commands/add-watching-reaction-command";
import {EventManager} from "../../event-manager";

export class TypingStartEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("typingStart", (channel: TextChannel, user) => {
                new AddWatchingReactionCommand(channel, this.getClient()).run();
            });
    }

}
