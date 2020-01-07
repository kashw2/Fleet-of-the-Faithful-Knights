import {Client, TextChannel} from "discord.js";
import {RemoveWatchingReactionCommand} from "../../../commands/remove-watching-reaction-command";
import {EventManager} from "../../event-manager";

export class TypingStopEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        this.clientManager.getClient()
            .on("typingStop", (channel: TextChannel, user) => {
                new RemoveWatchingReactionCommand(channel, this.clientManager.getClient()).run();
            });
    }

}
