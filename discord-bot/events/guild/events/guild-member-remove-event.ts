import {Client} from "discord.js";
import {Some} from "funfix-core";
import {EmbedUserLeavingMessageCommand} from "../../../commands/embed-user-leaving-message-command";
import {EventManager} from "../../event-manager";

export class GuildMemberRemoveEvent extends EventManager {

    constructor(readonly client: Client) {
        super(client);
        console.log(`Initialised ${GuildMemberRemoveEvent.name}`);
    }

    initialiseEvent(): void {
        this.getClient()
            .on("guildMemberRemove", member => {
                new EmbedUserLeavingMessageCommand(this.getClient(), Some(member)).run();
            });
    }

}
