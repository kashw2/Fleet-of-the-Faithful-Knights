import {User} from "./user";
import {List} from "immutable";
import {Either} from "funfix-core";
import {EitherUtils} from "../util/either-utils";

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

    getFirstUser(): User {
        return this.getUsers()
            .first();
    }

    getLastUser(): User {
        return this.getUsers()
            .last();
    }

    getUsers(): List<User> {
        return this.users;
    }

}
