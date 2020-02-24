import {User} from "./user";
import {List} from "immutable";
import {Either} from "funfix-core";
import {EitherUtils} from "../util/either-utils";
import {OptionUtils} from "../util/option-utils";

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

    getUsersByGroup(group: string): Either<string, List<User>> {
        return EitherUtils.liftEither(this.getUsers().filter(user => user.getGroup().contains(group)), `unable to find any users with the ${group} group`);
    }

    private getUsers(): List<User> {
        return this.users;
    }

}
