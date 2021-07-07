import {DbProcedures} from "./procedures/db-procedures";
import {List} from "immutable";
import {Group, Permission, User, Vote} from "@kashw2/lib-ts";
import {BehaviorSubject} from "rxjs";
import {UserCache} from "./caches/user-cache";
import {GroupCache} from "./caches/group-cache";
import {PermissionCache} from "./caches/permission-cache";
import {VoteCache} from "./caches/vote-cache";

export class DbCache {

    constructor(private procedures: DbProcedures) {
        this.cache();
    }

    groups: GroupCache = new GroupCache(List());

    permissions: PermissionCache = new PermissionCache(List());

    ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    users: UserCache = new UserCache(List());

    votes: VoteCache = new VoteCache(List());

    cache(): void {
        console.info('Starting Cache');
        Promise.all([
            this.cacheUsers(),
            this.cacheGroups(),
            this.cachePermissions(),
            this.cacheVotes(),
        ]).then(_ => {
            console.info('Cache Complete');
            this.ready.next(true)
        })
    }

    async cacheVotes(): Promise<void> {
        this.procedures.read.readVotes()
            .then(v => {
                this.votes = new VoteCache(v.getOrElse(List<Vote>()));
                console.log(`Loaded ${this.votes.size()} Votes`);
            })
    }

    async cacheGroups(): Promise<void> {
        this.procedures.read.readGroups()
            .then(g => {
                this.groups = new GroupCache(g.getOrElse(List<Group>()));
                console.info(`Loaded ${this.groups.size()} Groups`);
            })
    }

    async cachePermissions(): Promise<void> {
        this.procedures.read.readPermissions()
            .then(p => {
                this.permissions = new PermissionCache(p.getOrElse(List<Permission>()));
                console.log(`Loaded ${this.permissions.size()} Permissions`);
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
