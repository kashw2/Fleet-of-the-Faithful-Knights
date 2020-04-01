import {Either, Left, None, Option, Right, Some} from "funfix-core";

export class PromiseUtils {

    static async deliverPromiseOption<A>(opt: Option<Promise<A>>): Promise<Option<A>> {
        if (opt.nonEmpty()) {
            return  Promise.resolve(Option.of(await opt.get()));
        }
        return None;
    }

    static async deliverPromiseEither<A>(opt: Either<string, Promise<A>>): Promise<Either<string, A>> {
        if (opt.isRight()) {
            return  Promise.resolve(Right(await opt.get()));
        }
        return Left('Unable to deliver promise of Either');
    }

}
