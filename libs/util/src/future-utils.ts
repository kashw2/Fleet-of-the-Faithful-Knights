import {Future, Throwable} from "funfix";
import {Either, Option} from "funfix-core";

export class FutureUtils {

    /**
     * Given an Either, produce a Future that will raise an Error or return a Pure value
     */
    static fromEither<A>(either: Either<string, A>): Future<A> {
        return either.isLeft() ? Future.raise(either.value) : Future.pure(either.get());
    }

    /**
     * Given an Option, produce a Future that will raise an Error or return a Pure value
     */
    static fromOption<A>(option: Option<A>, error: Throwable): Future<A> {
        return option.isEmpty() ? Future.raise(error) : Future.pure(option.get());
    }

    /**
     * Idempotent function that allows us to execute an effect while returning the current state of the object being applied
     */
    static tap<A>(future: Future<A>, thunk: () => void): Future<A> {
        thunk();
        return future;
    }

    /**
     * Given two Futures, combine the two values into one with the unwrapped value being a Tuple of the values the respective Futures would hold.
     *
     * Inspired by scala.concurrent.Future.zip
     */
    static zip<A, B>(fa: Future<A>, fb: Future<B>): Future<[A, B]> {
        return Future.map2(fa, fb, (a, b) => [a, b]);
    }

    /**
     * Given two Futures, combine the two values into one with the unwrapped value being a Tuple of the values the respective Futures would hold.
     *
     * Similar to zip but allows definition of the mapping function applied
     *
     * Inspired by scala.concurrent.Future.zipWith
     */
    static zipWith<A, B>(fa: Future<A>, fb: Future<B>, thunk: (a: A, b: B) => [A, B]): Future<[A, B]> {
        return Future.map2(fa, fb, thunk);
    }

}