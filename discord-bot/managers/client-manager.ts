import {Client} from "discord.js";
import {Manager} from "../manager";

export class ClientManager {

    constructor(private manager: Manager) {
    }

    getClient(): Client {
        return this.manager.client;
    }

}
