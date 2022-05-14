import {Future} from "funfix";

export class FutureUtils {

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