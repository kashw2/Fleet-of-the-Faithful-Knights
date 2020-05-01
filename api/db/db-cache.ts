import {List} from "immutable";
import {interval} from "rxjs";
import {UserCache} from "../../core/src";
import {CandidateCache} from "../../core/src/models/candidate-cache";
import {NewsCache} from "../../core/src/models/news-cache";
import {VoteCache} from "../../core/src/models/vote-cache";
import {DbProcedures} from "./procedures/db-procedures";

export class DbCache {

    constructor(private procedures: DbProcedures) {
        this.start30MinuteCache();

        interval(1800000)
            .subscribe(() => this.start30MinuteCache());
    }

    candidates: CandidateCache = new CandidateCache(List());
    news: NewsCache = new NewsCache(List());
    users: UserCache = new UserCache(List());
    votes: VoteCache = new VoteCache(List());

    cacheCandidates(): void {
        this.procedures.read.getCandidates()
            .then(result => {
                result.forEach(x => {
                    this.candidates = new CandidateCache(x);
                    console.log(`Cached ${x.size} Candidates`);
                });
            });
    }

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

    cacheVotes(): void {
        this.procedures.read.getVotes()
            .then(result => {
                result.forEach(x => {
                    this.votes = new VoteCache(x);
                    console.log(`Cached ${x.size} Votes`);
                });
            });
    }

    start30MinuteCache(): void {
        Promise.resolve([
            this.cacheUsers(),
            this.cacheNews(),
            this.cacheVotes(),
            this.cacheCandidates(),
        ]);
    }

}
