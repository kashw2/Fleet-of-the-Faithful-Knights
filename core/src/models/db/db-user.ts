import {discriminatorKey, groupKey, JsonBuilder, SimpleJsonSerializer, User, usernameKey} from "../..";
import {Option} from "funfix-core";
import {MiscUtil} from "../../util/misc-util";

export class DbUser {

    constructor(
        readonly username: string,
        readonly discriminator: string,
        readonly groupId: number,
    ) {
    }

    fromUser(user: User): Option<DbUser> {
        return Option.map3(user.getUsername(), user.getDiscriminator(), user.getGroup(), (username, discriminator, group) => {
            return new DbUser(
                username,
                discriminator,
                MiscUtil.getGroupIdFromName(MiscUtil.parseGroup(group)),
            );
        })
    }

    getUsername(): string {
        return this.username;
    }

    getDiscriminator(): string {
        return this.discriminator;
    }

    getGroupId(): number {
        return this.groupId;
    }

}

export class DbUserJsonSerializer extends SimpleJsonSerializer<DbUser> {

    fromJson(json: any): DbUser {
        throw new Error('Db classes are read only');
    }

    toJsonImpl(value: DbUser, builder: JsonBuilder): object {
        throw builder.add(value.getUsername(), usernameKey)
            .add(value.getDiscriminator(), discriminatorKey)
            .add(value.getGroupId(), groupKey)
            .build();
    }

}
