import {List} from "immutable";
import {interval} from "rxjs";
import {RankCache, UserCache} from "../../core";
import {Database} from "./db";

export class DbCache {

    constructor(private db: Database) {

        this.dailyImport();

        interval(86400000)
            .subscribe(_ => this.dailyImport());
    }

    ranks: RankCache = new RankCache(List());
    users: UserCache = new UserCache(List());

    async dailyImport(): Promise<void> {
        Promise.all([
            this.getAllUsers(),
            this.getAllRanks(),
        ]);
    }

    async getAllRanks(): Promise<void> {
        const result = await this.db.procedures.getAllRanks();
        console.log("Populating Rank Cache");
        result.map(x => this.ranks = new RankCache(x));
    }

    async getAllUsers(): Promise<void> {
        const result = await this.db.procedures.getAllUsers();
        console.log("Populating User Cache");
        result.map(x => this.users = new UserCache(x));
    }

}
