import {List, Map} from "immutable";
import {User} from "@kashw2/lib-ts";
import {Cache} from "./cache";
import {CollectionUtils, EitherUtils} from "@kashw2/lib-util";
import {Either, Option} from "funfix";

export class UserCache extends Cache<User> {

    constructor(private users: List<User> = List()) {
        super(users);
    }

    private byDiscordId: Map<string, User> = CollectionUtils.buildKeyedMap(this.getUsers(), u => u.getDiscordId());

    private byUserId: Map<string, User> = CollectionUtils.buildKeyedMap(this.getUsers(), u => u.getId());

    getByDiscordId(discordId: string): Either<string, User> {
        return EitherUtils.toEither(Option.of(this.byDiscordId.get(discordId)), `User with discord id ${discordId} does not exist`);
    }

    getByUserId(userId: string): Either<string, User> {
        return EitherUtils.toEither(Option.of(this.byUserId.get(userId)), `User with id ${userId} does not exist`);
    }

    getUsers(): List<User> {
        return super.getValues();
    }

}
