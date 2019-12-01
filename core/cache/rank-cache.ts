import {Either} from "funfix-core";
import {List} from "immutable";
import {EitherUtils, Rank} from "..";

export class RankCache {

    constructor(readonly ranks: List<Rank>) {
    }

    getById(id: number): Rank {
        return this.ranks.get(id) as Rank;
    }

    getByIdEither(id: number): Either<string, Rank> {
        return EitherUtils.liftEither(this.ranks.get(id) as Rank, "Rank not found");
    }

}
