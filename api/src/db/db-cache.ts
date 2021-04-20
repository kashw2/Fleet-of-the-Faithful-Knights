import {DbProcedures} from "./procedures/db-procedures";
import {List} from "immutable";
import {User} from "@kashw2/lib-ts";
import {BehaviorSubject} from "rxjs";

export class DbCache {

    constructor(private procedures: DbProcedures) {
        this.cache();
    }

    ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    users: List<User> = List();

    cache(): void {
        console.log('Starting Cache');
        Promise.all([
            this.cacheUsers(),
        ]).then(v => {
            console.log('Cache Complete');
            this.ready.next(true)
        })
    }

    cacheUsers(): Promise<List<User>> {
        return this.procedures.read.readUsers()
            .then(u => this.users = u.getOrElse(List<User>()));
    }

    isReady(): boolean {
        return this.ready
            .getValue();
    }

}
