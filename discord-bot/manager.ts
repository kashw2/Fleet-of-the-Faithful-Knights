import {Client} from "discord.js";
import {ClientManager} from "./managers/client-manager";
import {GuildManager} from "./managers/guild-manager";
import {UserManager} from "./managers/user-manager";

export class Manager {

    clientManager: ClientManager;
    guildManager: GuildManager;
    userManager: UserManager;

    constructor(readonly client: Client) {
        this.clientManager = new ClientManager(this);
        this.guildManager = new GuildManager(this);
        this.userManager = new UserManager(this);
    }

}
