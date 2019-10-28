import {None, Option} from "funfix-core";
import {Rank} from "./rank";

export class User {

    constructor(
        readonly id: Option<number> = None,
        readonly username: Option<string> = None,
        readonly discordName: Option<string> = None,
        readonly rank: Option<Rank> = None,
    ) {
    }

    getDiscordName(): Option<string> {
        return this.discordName;
    }

    getId(): Option<number> {
        return this.id;
    }

    getRank(): Option<Rank> {
        return this.rank;
    }

    getUsername(): Option<string> {
        return this.username;
    }

}
