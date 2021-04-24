import {Cache} from "./cache";
import {Group} from "@kashw2/lib-ts";
import {List} from "immutable";

export class GroupCache extends Cache<Group> {

    constructor(private groups: List<Group> = List()) {
        super(groups);
    }

    getGroups(): List<Group> {
        return this.groups;
    }

}
