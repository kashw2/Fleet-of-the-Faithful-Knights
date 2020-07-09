import {Set} from "immutable";
import {Either} from "funfix-core";
import {EitherUtils} from "..";

export class GroupCache {

    constructor(private groups: Set<string>) {
    }

    private getGroups(): Set<string> {
        return this.groups;
    }

    getGroupsEither(): Either<string, Set<string>> {
        return EitherUtils.liftEither(this.getGroups(), "No groups found in group cache");
    }

}
