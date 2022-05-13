import {Either, Left, Option, Right} from "funfix-core";
import {Future} from "funfix";
import {Collection, List, Set} from "immutable";

export class EitherUtils {

    static flatMap2<LEFT, A, B, C>(
        e1: Either<LEFT, A>,
        e2: Either<LEFT, B>,
        f: (a: A, b: B) => Either<LEFT, C>,
    ): Either<LEFT, C> {
        if (e1.isLeft() || e2.isLeft()) {
            return Left(e1.flatMap(_ => e2).value as LEFT);
        }
        return f(e1.get(), e2.get());
    }

    static flatMap3<LEFT, A, B, C, D>(
        e1: Either<LEFT, A>,
        e2: Either<LEFT, B>,
        e3: Either<LEFT, C>,
        f: (a: A, b: B, c: C) => Either<LEFT, D>,
    ): Either<LEFT, D> {
        if (e1.isLeft() || e2.isLeft() || e3.isLeft()) {
            return Left(e1.flatMap(_ => e2).flatMap(_ => e3).value as LEFT);
        }
        return f(e1.get(), e2.get(), e3.get());
    }

    static flatMap4<LEFT, A, B, C, D, E>(
        e1: Either<LEFT, A>,
        e2: Either<LEFT, B>,
        e3: Either<LEFT, C>,
        e4: Either<LEFT, D>,
        f: (a: A, b: B, d: C, e: D) => Either<LEFT, E>,
    ): Either<LEFT, E> {
        if (e1.isLeft() || e2.isLeft() || e3.isLeft() || e4.isLeft()) {
            return Left(e1.flatMap(_ => e2).flatMap(_ => e3).flatMap(_ => e4).value as LEFT);
        }
        return f(e1.get(), e2.get(), e3.get(), e4.get());
    }

    static flatMap5<LEFT, A, B, C, D, E, F>(
        e1: Either<LEFT, A>,
        e2: Either<LEFT, B>,
        e3: Either<LEFT, C>,
        e4: Either<LEFT, D>,
        e5: Either<LEFT, E>,
        f: (a: A, b: B, c: C, d: D, e: E) => Either<LEFT, F>,
    ): Either<LEFT, F> {
        if (e1.isLeft() || e2.isLeft() || e3.isLeft() || e4.isLeft() || e5.isLeft()) {
            return Left(e1.flatMap(_ => e2).flatMap(_ => e3).flatMap(_ => e4).flatMap(_ => e5).value as LEFT);
        }
        return f(e1.get(), e2.get(), e3.get(), e4.get(), e5.get());
    }

    static flatMap6<LEFT, A, B, C, D, E, F, G>(
        e1: Either<LEFT, A>,
        e2: Either<LEFT, B>,
        e3: Either<LEFT, C>,
        e4: Either<LEFT, D>,
        e5: Either<LEFT, E>,
        e6: Either<LEFT, F>,
        f: (a: A, b: B, c: C, d: D, e: E, f: F) => Either<LEFT, G>,
    ): Either<LEFT, G> {
        if (e1.isLeft() || e2.isLeft() || e3.isLeft() || e4.isLeft() || e5.isLeft() || e6.isLeft()) {
            return Left(e1.flatMap(_ => e2).flatMap(_ => e3).flatMap(_ => e4).flatMap(_ => e5).flatMap(_ => e6).value as LEFT);
        }
        return f(e1.get(), e2.get(), e3.get(), e4.get(), e5.get(), e6.get());
    }

    static flatMap7<LEFT, A, B, C, D, E, F, G, H>(
        e1: Either<LEFT, A>,
        e2: Either<LEFT, B>,
        e3: Either<LEFT, C>,
        e4: Either<LEFT, D>,
        e5: Either<LEFT, E>,
        e6: Either<LEFT, F>,
        e7: Either<LEFT, G>,
        f: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => Either<LEFT, H>,
    ): Either<LEFT, H> {
        if (e1.isLeft() || e2.isLeft() || e3.isLeft() || e4.isLeft() || e5.isLeft() || e6.isLeft() || e7.isLeft()) {
            return Left(e1.flatMap(_ => e2).flatMap(_ => e3).flatMap(_ => e4).flatMap(_ => e5).flatMap(_ => e6).flatMap(_ => e7).value as LEFT);
        }
        return f(e1.get(), e2.get(), e3.get(), e4.get(), e5.get(), e6.get(), e7.get());
    }

    static flatMap8<LEFT, A, B, C, D, E, F, G, H, I>(
        e1: Either<LEFT, A>,
        e2: Either<LEFT, B>,
        e3: Either<LEFT, C>,
        e4: Either<LEFT, D>,
        e5: Either<LEFT, E>,
        e6: Either<LEFT, F>,
        e7: Either<LEFT, G>,
        e8: Either<LEFT, H>,
        f: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => Either<LEFT, I>,
    ): Either<LEFT, I> {
        if (e1.isLeft() || e2.isLeft() || e3.isLeft() || e4.isLeft() || e5.isLeft() || e6.isLeft() || e7.isLeft() || e8.isLeft()) {
            return Left(e1.flatMap(_ => e2).flatMap(_ => e3).flatMap(_ => e4).flatMap(_ => e5).flatMap(_ => e6).flatMap(_ => e7).flatMap(_ => e8).value as LEFT);
        }
        return f(e1.get(), e2.get(), e3.get(), e4.get(), e5.get(), e6.get(), e7.get(), e8.get());
    }

    static flattenCollection<T>(collection: Collection<any, Either<any, T>>): Collection<any, T> {
        return collection.filter(v => v.isRight())
            .map(v => v.get());
    }

    static leftMap<A, B, C>(e: Either<B, A>, f: (b: B) => C): Either<C, A> {
        if (e.isLeft()) {
            return Left(f(e.value));
        }
        return Right(e.get());
    }

    static leftTap<A, B>(e: Either<B, A>, f: (b: B) => void): Either<B, A> {
        if (e.isLeft()) {
            f(e.value);
        }
        return e;
    }

    static liftEither<A>(value: A, left: string): Either<string, A> {
        return Option.of(value).nonEmpty() ? Right(value) : Left(left);
    }

    static map2<LEFT, A, B, C>(
        e1: Either<LEFT, A>,
        e2: Either<LEFT, B>,
        f: (a: A, b: B) => C
    ): Either<LEFT, C> {
        if (e1.isLeft() || e2.isLeft()) {
            return Left(e1.flatMap(_ => e2).value as LEFT);
        }
        return Right(f(e1.get(), e2.get()));
    }

    static map3<LEFT, A, B, C, D>(
        e1: Either<LEFT, A>,
        e2: Either<LEFT, B>,
        e3: Either<LEFT, C>,
        f: (a: A, b: B, c: C) => D
    ): Either<LEFT, D> {
        if (e1.isLeft() || e2.isLeft() || e3.isLeft()) {
            return Left(e1.flatMap(_ => e2).flatMap(_ => e3).value as LEFT);
        }
        return Right(f(e1.get(), e2.get(), e3.get()));
    }

    static map4<LEFT, A, B, C, D, E>(
        e1: Either<LEFT, A>,
        e2: Either<LEFT, B>,
        e3: Either<LEFT, C>,
        e4: Either<LEFT, D>,
        f: (a: A, b: B, c: C, d: D) => E,
    ): Either<LEFT, E> {
        if (e1.isLeft() || e2.isLeft() || e3.isLeft() || e4.isLeft()) {
            return Left(e1.flatMap(_ => e2).flatMap(_ => e3).flatMap(_ => e4).value as LEFT);
        }
        return Right(f(e1.get(), e2.get(), e3.get(), e4.get()));
    }

    static map5<LEFT, A, B, C, D, E, F>(
        e1: Either<LEFT, A>,
        e2: Either<LEFT, B>,
        e3: Either<LEFT, C>,
        e4: Either<LEFT, D>,
        e5: Either<LEFT, E>,
        f: (a: A, b: B, c: C, d: D, e: E) => F,
    ): Either<LEFT, F> {
        if (e1.isLeft() || e2.isLeft() || e3.isLeft() || e4.isLeft() || e5.isLeft()) {
            return Left(e1.flatMap(_ => e2).flatMap(_ => e3).flatMap(_ => e4).flatMap(_ => e5).value as LEFT);
        }
        return Right(f(e1.get(), e2.get(), e3.get(), e4.get(), e5.get()));
    }

    static map6<LEFT, A, B, C, D, E, F, G>(
        e1: Either<LEFT, A>,
        e2: Either<LEFT, B>,
        e3: Either<LEFT, C>,
        e4: Either<LEFT, D>,
        e5: Either<LEFT, E>,
        e6: Either<LEFT, F>,
        f: (a: A, b: B, c: C, d: D, e: E, f: F) => G,
    ): Either<LEFT, G> {
        if (e1.isLeft() || e2.isLeft() || e3.isLeft() || e4.isLeft() || e5.isLeft() || e6.isLeft()) {
            return Left(e1.flatMap(_ => e2).flatMap(_ => e3).flatMap(_ => e4).flatMap(_ => e5).flatMap(_ => e6).value as LEFT);
        }
        return Right(f(e1.get(), e2.get(), e3.get(), e4.get(), e5.get(), e6.get()));
    }

    static map7<LEFT, A, B, C, D, E, F, G, H>(
        e1: Either<LEFT, A>,
        e2: Either<LEFT, B>,
        e3: Either<LEFT, C>,
        e4: Either<LEFT, D>,
        e5: Either<LEFT, E>,
        e6: Either<LEFT, F>,
        e7: Either<LEFT, G>,
        f: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => H,
    ): Either<LEFT, H> {
        if (e1.isLeft() || e2.isLeft() || e3.isLeft() || e4.isLeft() || e5.isLeft() || e6.isLeft() || e7.isLeft()) {
            return Left(e1.flatMap(_ => e2).flatMap(_ => e3).flatMap(_ => e4).flatMap(_ => e5).flatMap(_ => e6).flatMap(_ => e7).value as LEFT);
        }
        return Right(f(e1.get(), e2.get(), e3.get(), e4.get(), e5.get(), e6.get(), e7.get()));
    }

    static map8<LEFT, A, B, C, D, E, F, G, H, I>(
        e1: Either<LEFT, A>,
        e2: Either<LEFT, B>,
        e3: Either<LEFT, C>,
        e4: Either<LEFT, D>,
        e5: Either<LEFT, E>,
        e6: Either<LEFT, F>,
        e7: Either<LEFT, G>,
        e8: Either<LEFT, H>,
        f: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => I,
    ): Either<LEFT, I> {
        if (e1.isLeft() || e2.isLeft() || e3.isLeft() || e4.isLeft() || e5.isLeft() || e6.isLeft() || e7.isLeft() || e8.isLeft()) {
            return Left(e1.flatMap(_ => e2).flatMap(_ => e3).flatMap(_ => e4).flatMap(_ => e5).flatMap(_ => e6).flatMap(_ => e7).flatMap(_ => e8).value as LEFT);
        }
        return Right(f(e1.get(), e2.get(), e3.get(), e4.get(), e5.get(), e6.get(), e7.get(), e8.get()));
    }

    static sequence<A>(ep: Either<any, Promise<Either<any, A>>>): Promise<Either<any, A>> {
        if (ep.isLeft()) {
            return Promise.resolve(Left(ep.value));
        }
        return ep.get();
    }

    static sequenceFuture<A>(ef: Either<any, Future<Either<any, A>>>): Future<Either<any, A>> {
        if (ef.isLeft()) {
            return Future.raise(Left(ef.value));
        }
        return ef.get();
    }

    static toEither<A>(value: Option<A>, left: string): Either<string, A> {
        return value.map(v => Right(v))
            .getOrElse(Left(left));
    }

}
