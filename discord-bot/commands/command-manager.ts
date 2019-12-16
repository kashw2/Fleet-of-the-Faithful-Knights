import {Client} from "discord.js";
import {Manager} from "../manager";

export abstract class CommandManager extends Manager {

    constructor(readonly client: Client) {
        super(client);
    }

    abstract run(): void;

}
