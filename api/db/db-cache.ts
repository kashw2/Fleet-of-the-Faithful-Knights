import {Database} from "./database";
import {interval} from "rxjs";
import {List} from 'immutable';
import {UserCache, UserJsonSerializer} from "../../core/src";

export class DbCache {

    users: UserCache = new UserCache(List());

    constructor(private db: Database) {
        this.start5MinuteCache();

        interval(300000)
            .subscribe(() => this.start5MinuteCache());
    }

    async cacheUsers(): Promise<void> {
        this.db.requests.sendRequestListSerialized('ssp_json_GetUsers', List.of(), UserJsonSerializer.instance)
            .then(result => {
                result.forEach(x => {
                    this.users = new UserCache(x);
                    console.log(`Cached ${x.size} Users`);
                });
            });
    }

    start5MinuteCache(): Promise<void> {
        return Promise.resolve(
            this.cacheUsers(),
        );
    }

}
