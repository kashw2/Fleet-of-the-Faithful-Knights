import {Client} from "discord.js";
import {Manager} from "../manager";

export abstract class EventManager extends Manager {

    constructor(readonly client: Client) {
        super(client);
    }

    abstract initialiseEvent(): void;

}
