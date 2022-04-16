import {Cache} from "./cache";
import {Group} from "@kashw2/lib-ts";
import {List, Map} from "immutable";
import {CollectionUtils, EitherUtils} from "@kashw2/lib-util";
import {Either, Option} from "funfix";

export class GroupCache extends Cache<Group> {

    constructor(private groups: List<Group> = List()) {
        super(groups);
    }

    byId: Map<string, Group> = CollectionUtils.buildKeyedMap(this.getGroups(), (g) => g.getId());

    getGroups(): List<Group> {
        return super.getValues();
    }

    getGroupsById(groupId: string): Either<string, Group> {
        return EitherUtils.toEither(Option.of(this.byId.get(groupId)), `Group with id ${groupId} does not exist`);
    }

}
