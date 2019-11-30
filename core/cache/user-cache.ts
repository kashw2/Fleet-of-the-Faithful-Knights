import {List} from "immutable";
import {User} from "..";

export class UserCache {

    constructor(readonly users: List<User>) {
    }

    getById(id: number): User {
        return this.users.get(id) as User;
    }

}
