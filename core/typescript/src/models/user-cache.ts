import {Either} from "funfix-core";
import {List} from "immutable";
import {EitherUtils} from "../util/either-utils";
import {User} from "./user";

// Partial builder pattern implementation

export class UserCache {

    constructor(private users: List<User>) {
    }

    getById(id: number): User {
        return this.getUsers()
            .get(id)!;
    }

    getByIdEither(id: number): Either<string, User> {
        return EitherUtils.liftEither(this.getById(id), `User ${id} does not exist in cache`);
    }

    getFirst(): User {
        return this.getUsers()
            .first();
    }

    getLast(): User {
        return this.getUsers()
            .last();
    }

    getUserByName(name: string): Either<string, User> {
        return EitherUtils.liftEither(this.getUsers().find(u => u.getUsername().contains(name))!, `${name} does not exist in the user cache`);
    }

    getUserByToken(token: string): Either<string, User> {
        return EitherUtils.liftEither(this.getUsers().find(u => u.getToken().contains(token))!, `unable to find any users by the token ${token}`);
    }

    private getUsers(): List<User> {
        return this.users;
    }

    getUsersByGroup(group: string): Either<string, List<User>> {
        return EitherUtils.liftEither(this.getUsers().filter(user => user.getGroup().contains(group)), `unable to find any users with the ${group} group`);
    }

    getUsersEither(): Either<string, List<User>> {
        return EitherUtils.liftEither(this.getUsers(), "user cache is empty");
    }

    getUsersWithoutToken(): Either<string, List<User>> {
        return EitherUtils.liftEither(this.getUsers()
            .map(user => User.withoutToken(user)), "unable to retrieve users");
    }

}
