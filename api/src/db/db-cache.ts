import {DbProcedures} from "./procedures/db-procedures";
import {List} from "immutable";
import {Ballot, Candidate, Group, Permission, User, Vote} from "@kashw2/lib-ts";
import {BehaviorSubject, interval, of} from "rxjs";
import {UserCache} from "./caches/user-cache";
import {GroupCache} from "./caches/group-cache";
import {PermissionCache} from "./caches/permission-cache";
import {VoteCache} from "./caches/vote-cache";
import {BallotCache} from "./caches/ballot-cache";
import {switchMap} from "rxjs/operators";
import {CandidateCache} from "./caches/candidate-cache";
import {IO} from "funfix";

export class DbCache {

    constructor(private procedures: DbProcedures) {
        of(this.cache().run())
            .pipe(switchMap(_ => interval(300000)))
            .subscribe(_ => this.cache().run());
    }

    ballots: BallotCache = new BallotCache(List());

    candidates: CandidateCache = new CandidateCache(List());

    groups: GroupCache = new GroupCache(List());

    permissions: PermissionCache = new PermissionCache(List());

    ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    users: UserCache = new UserCache(List());

    votes: VoteCache = new VoteCache(List());

    cache(): IO<void> {
        return IO.always(() => console.info('Starting Cache'))
            .flatMap(_ => IO.map6(
                this.cacheUsers(),
                this.cacheGroups(),
                this.cachePermissions(),
                this.cacheVotes(),
                this.cacheBallots(),
                this.cacheCandidates(),
                (u, g, p, v, b, c) => {
                    console.info('Cache Complete');
                    this.ready.next(true);
                }
            ));
    }

    cacheBallots(): IO<void> {
        return IO.fromFuture(this.procedures.read.readBallots())
            .forEach(b => {
                this.ballots = new BallotCache(b.getOrElse(List<Ballot>()));
                console.info(`Loaded ${this.ballots.size} Ballots`);
            });
    }

    cacheCandidates(): IO<void> {
        return IO.fromFuture(this.procedures.read.readCandidates())
            .forEach(b => {
                this.candidates = new CandidateCache(b.getOrElse(List<Candidate>()));
                console.info(`Loaded ${this.candidates.size} Candidate`);
            });
    }

    cacheGroups(): IO<void> {
        return IO.fromFuture(this.procedures.read.readGroups())
            .forEach(g => {
                this.groups = new GroupCache(g.getOrElse(List<Group>()));
                console.info(`Loaded ${this.groups.size} Groups`);
            });
    }

    cachePermissions(): IO<void> {
        return IO.fromFuture(this.procedures.read.readPermissions())
            .forEach(p => {
                this.permissions = new PermissionCache(p.getOrElse(List<Permission>()));
                console.log(`Loaded ${this.permissions.size} Permissions`);
            });
    }

    cacheUsers(): IO<void> {
        return IO.fromFuture(this.procedures.read.readUsers())
            .forEach(u => {
                this.users = new UserCache(u.getOrElse(List<User>()));
                console.info(`Loaded ${this.users.size} Users`);
            });
    }

    cacheVotes(): IO<void> {
        return IO.fromFuture(this.procedures.read.readVotes())
            .forEach(v => {
                this.votes = new VoteCache(v.getOrElse(List<Vote>()));
                console.log(`Loaded ${this.votes.size} Votes`);
            });
    }

    isReady(): boolean {
        return this.ready
            .getValue();
    }

}
