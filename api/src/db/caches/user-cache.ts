import {List} from "immutable";
import {User} from "@kashw2/lib-ts";

export class UserCache {

    // TODO: Make this a Map so we can get by user id, user name etc
    constructor(private users: List<User> = List()) {
    }

    getUsers(): List<User> {
        return this.users;
    }

    update(users: List<User>): List<User> {
        return this.users = this.users.clear().concat(users);
    }

}
