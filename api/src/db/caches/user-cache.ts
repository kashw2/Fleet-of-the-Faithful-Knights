import {List} from "immutable";
import {User} from "@kashw2/lib-ts";
import {Cache} from "./cache";

export class UserCache extends Cache<User> {

    // TODO: Make this a Map so we can get by user id, user name etc
    constructor(private users: List<User> = List()) {
        super(users);
    }

    getUsers(): List<User> {
        return this.users;
    }

}
