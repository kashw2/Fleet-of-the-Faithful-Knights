import {Either, Left, Option, Right} from "funfix-core";
import {List} from "immutable";

export class EitherUtils {

    /**
     * lifts a type to an Either
     */
    static liftEither<A>(value: A, exception: string): Either<string, A> {
        return this.toEither(Option.of(value), exception);
    }

    /**
     * converts an Option to an Either
     */
    static toEither<A>(value: Option<A>, exception: string): Either<string, A> {
        if (value.isEmpty()) {
            return Left(exception);
        }
        return Right(value.get());
    }

    /**
     * Verify that list items are Right and if not, return List();
     */
    static verifyList<A>(list: List<Either<any, A>>): List<A> {
        return list.filter(item => item.isRight())
            .map(x => x.get());
    }

}
