import {DbProcedures} from "./procedures/db-procedures";
import {List} from "immutable";
import {Group, User} from "@kashw2/lib-ts";
import {BehaviorSubject} from "rxjs";
import {UserCache} from "./caches/user-cache";
import {GroupCache} from "./caches/group-cache";

export class DbCache {

    constructor(private procedures: DbProcedures) {
        this.cache();
    }

    groups: GroupCache = new GroupCache(List());

    ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    users: UserCache = new UserCache(List());

    cache(): void {
        console.info('Starting Cache');
        Promise.all([
            this.cacheUsers(),
            this.cacheGroups(),
        ]).then(_ => {
            console.info('Cache Complete');
            this.ready.next(true)
        })
    }

    async cacheGroups(): Promise<void> {
        this.procedures.read.readGroups()
            .then(g => {
                this.groups = new GroupCache(g.getOrElse(List<Group>()));
                console.info(`Loaded ${this.groups.size()} Groups`);
            })
    }

    async cacheUsers(): Promise<void> {
        this.procedures.read.readUsers()
            .then(u => {
                this.users = new UserCache(u.getOrElse(List<User>()));
                console.info(`Loaded ${this.users.size()} Users`);
            });
    }

    isReady(): boolean {
        return this.ready
            .getValue();
    }

}
