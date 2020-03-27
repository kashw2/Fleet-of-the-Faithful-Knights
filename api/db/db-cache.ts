import {Database} from "./database";
import {interval} from "rxjs";
import {List} from 'immutable';
import {UserCache} from "../../core/src";
import {NewsCache} from "../../core/src/models/news-cache";

export class DbCache {

    constructor(private db: Database) {
        this.start30MinuteCache();

        interval(1800000)
            .subscribe(() => this.start30MinuteCache());
    }

    news: NewsCache = new NewsCache(List());
    users: UserCache = new UserCache(List());

    cacheNews(): void {
        this.db.procedures.read.getNews()
            .then(result => {
                result.forEach(x => {
                    this.db.cache.news = new NewsCache(x);
                    console.log(`Cached ${x.size} News Articles`);
                });
            });
    }

    cacheUsers(): void {
        this.db.procedures.read.getUsers()
            .then(result => {
                result.forEach(x => {
                    this.db.cache.users = new UserCache(x);
                    console.log(`Cached ${x.size} Users`);
                });
            });
    }

    start30MinuteCache(): void {
        Promise.resolve([
            this.cacheUsers(),
            this.cacheNews(),
        ]);
    }

}
