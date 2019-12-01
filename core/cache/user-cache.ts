import {Either} from "funfix-core";
import {List} from "immutable";
import {EitherUtils, User} from "..";

export class UserCache {

    constructor(readonly users: List<User>) {
    }

    getById(id: number): User {
        return this.users.get(id) as User;
    }

    getByIdEither(id: number): Either<string, User> {
        return EitherUtils.liftEither(this.users.get(id) as User, "User not found");
    }

}
