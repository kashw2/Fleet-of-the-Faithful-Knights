import {List} from "immutable";
import {interval} from "rxjs";
import {UserCache} from "../../core";
import {Database} from "./db";

export class DbCache {

    constructor(readonly db: Database) {

        this.dailyImport();

        interval(86400000)
            .subscribe(_ => this.dailyImport());
    }

    users: UserCache = new UserCache(List());

    async dailyImport(): Promise<void> {
        Promise.all([
            this.getAllUsers(),
        ]);
    }

    async getAllUsers(): Promise<void> {
        const result = await this.db.procedures.getAllUsers();
        console.log("Populating User Cache");
        result.map(x => this.users = new UserCache(x));
    }

}
