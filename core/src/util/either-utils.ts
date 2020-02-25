import {Either, Left, Option, Right} from "funfix-core";

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

}
