import {DbProcedures} from "./procedures/db-procedures";
import {List} from "immutable";
import {User} from "@kashw2/lib-ts";
import {BehaviorSubject} from "rxjs";
import {UserCache} from "./caches/user-cache";

export class DbCache {

    constructor(private procedures: DbProcedures) {
        this.cache();
    }

    ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    users: UserCache = new UserCache(List());

    cache(): void {
        console.log('Starting Cache');
        Promise.all([
            this.cacheUsers(),
        ]).then(_ => {
            console.log('Cache Complete');
            this.ready.next(true)
        })
    }

    async cacheUsers(): Promise<void> {
        this.procedures.read.readUsers()
            .then(u => this.users = new UserCache(u.getOrElse(List<User>())));
    }

    isReady(): boolean {
        return this.ready
            .getValue();
    }

}
