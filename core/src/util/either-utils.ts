import {Either, Left, Option, Right} from "funfix-core";
import {List} from "immutable";

export class EitherUtils {

    /**
     * Flattens a list of Eithers to return a new list of Rights
     */
    static flattenList<A>(list: List<Either<any, A>>): List<A> {
        return list.filter(item => item.isRight())
            .map(x => x.get());
    }

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
     * Confirmed state of an Either containing a List
     * Returns the right side of the List if Right and an empty List if Left
     */
    static toList<T>(either: Either<any, List<T>>): List<T> {
        return either.getOrElse(List());
    }

}
