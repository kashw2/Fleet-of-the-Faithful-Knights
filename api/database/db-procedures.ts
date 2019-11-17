import {Either} from "funfix-core";
import {List} from "immutable";
import {EitherUtils, User, UserJsonSerializer} from "../../core";
import {Database} from "./db";

export class DbProcedures {

    constructor(readonly db: Database) {

    }

    async getAllUsers(): Promise<Either<string, List<User>>> {
        const result = await this.db.requests.runListSerialized(
            "ssp_json_GetAllUsers",
            List(),
            UserJsonSerializer.instance,
        );
        return EitherUtils.liftEither(result, "Error serializing Users");
    }

    async getUser(username: string, password: string): Promise<Either<string, User>> {
        const result = await this.db.requests.runSingleSerialised(
            "ssp_json_GetUser",
            List.of(`@Username = '${username}'`, `@Password = '${password}'`),
            UserJsonSerializer.instance,
        );
        return EitherUtils.liftEither(result, "Error serializing User");
    }

}
