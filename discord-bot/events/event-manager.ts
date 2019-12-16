import {Client, ClientUserSettings, DMChannel, Presence, Snowflake, User} from "discord.js";
import {Either, Left, Right} from "funfix-core";
import {List} from "immutable";
import {EitherUtils} from "../../core";
import {Manager} from "../manager";

export abstract class EventManager extends Manager {

    constructor(readonly client: Client) {
        super(client);
    }

    abstract initialiseEvent(): void;

}
