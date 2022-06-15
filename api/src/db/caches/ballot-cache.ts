import {Cache} from "./cache";
import {Ballot} from "@kashw2/lib-ts";
import {List, Map} from "immutable";
import {CollectionUtils, EitherUtils} from "@kashw2/lib-util";
import {Either, Option} from "funfix-core";

export class BallotCache extends Cache<Ballot> {

  constructor(private ballots: List<Ballot> = List<Ballot>()) {
    super(ballots);
  }

  byId: Map<string, Ballot> = CollectionUtils.buildKeyedMap(this.getBallots(), (g) => g.getId());

  getBallotById(ballotId: string): Either<string, Ballot> {
    return EitherUtils.toEither(Option.of(this.byId.get(ballotId)), `Ballot with id ${ballotId} does not exist`);
  }

  getBallots(): List<Ballot> {
    return super.getValues();
  }

}