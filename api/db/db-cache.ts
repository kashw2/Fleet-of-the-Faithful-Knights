import {Database} from "./database";
import {interval} from "rxjs";
import {List} from 'immutable';
import {UserCache} from "../../core/src";
import {NewsCache} from "../../core/src/models/news-cache";
import {DbProcedures} from "./procedures/db-procedures";

export class DbCache {

    constructor(private procedures: DbProcedures) {
        this.start30MinuteCache();

        interval(1800000)
            .subscribe(() => this.start30MinuteCache());
    }

    news: NewsCache = new NewsCache(List());
    users: UserCache = new UserCache(List());

    cacheNews(): void {
        this.procedures.read.getNews()
            .then(result => {
                result.forEach(x => {
                    this.news = new NewsCache(x);
                    console.log(`Cached ${x.size} News Articles`);
                });
            });
    }

    cacheUsers(): void {
        this.procedures.read.getUsers()
            .then(result => {
                result.forEach(x => {
                    this.users = new UserCache(x);
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
