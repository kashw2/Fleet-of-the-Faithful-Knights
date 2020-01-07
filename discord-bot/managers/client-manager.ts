import {Client} from "discord.js";
import {Either, Left, Right} from "funfix-core";
import {Manager} from "../manager";

export class ClientManager {

    constructor(private manager: Manager) {
    }

    getClient(): Client {
        return this.manager.clientManager.getClient();
    }

}
