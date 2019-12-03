import {Either} from "funfix-core";
import {List} from "immutable";
import {
    EitherUtils,
    idKey,
    Rank,
    RankJsonSerializer,
    User,
    UserJsonSerializer,
    Vote,
    VoteJsonSerializer,
} from "../../core";
import {Database} from "./db";

export class DbProcedures {

    constructor(private db: Database) {

    }

    async getAllRanks(): Promise<Either<string, List<Rank>>> {
        const result = await this.db.requests.runListSerialized(
            "ssp_json_GetAllRanks",
            List(),
            RankJsonSerializer.instance,
        );
        return EitherUtils.liftEither(result, "Error serializing Ranks");
    }

    async getAllUsers(): Promise<Either<string, List<User>>> {
        const result = await this.db.requests.runListSerialized(
            "ssp_json_GetAllUsers",
            List(),
            UserJsonSerializer.instance,
        );
        return EitherUtils.liftEither(result, "Error serializing Users");
    }

    async getAllVotes(): Promise<Either<string, List<Vote>>> {
        const result = await this.db.requests.runListSerialized(
            "ssp_json_GetAllVotes",
            List(),
            VoteJsonSerializer.instance,
        );
        return EitherUtils.liftEither(result, "Error serializing Votes");
    }

    async getUser(username: string, password: string): Promise<Either<string, object>> {
        const result = await this.db.requests.runSingle(
            "ssp_json_GetUser",
            List.of(`@Username = '${username}'`, `@Password = '${password}'`),
        );
        // @ts-ignore
        return EitherUtils.liftEither(result[idKey], "Error serializing User");
    }

}
