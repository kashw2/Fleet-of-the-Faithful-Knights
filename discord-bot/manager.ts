import {Client, ClientUserSettings, DMChannel, Guild, Presence, Snowflake, User} from "discord.js";
import {Either, Left, Right} from "funfix-core";
import {List} from "immutable";
import {ClientManager} from "./managers/client-manager";

export class Manager {

    clientManager: ClientManager;

    constructor(readonly client: Client) {
        this.clientManager = new ClientManager(this);
    }


}
