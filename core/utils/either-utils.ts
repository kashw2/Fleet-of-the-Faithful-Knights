import {Either, Left, Option, Right} from "funfix-core";

export class EitherUtils {

    static flatMap2<A, B, C, D>(
        e1: Either<A, B>,
        e2: Either<A, C>,
        f: (a: B, b: C) => Either<A, D>,
    ): Either<A, D> {
        if (e1.isRight() && e2.isRight()) {
            return f(e1.get(), e2.get());
        } else if (e1.isLeft()) {
            return e1;
        } else if (e2.isLeft()) {
            return e2;
        }
        throw new Error("Either.flatMap error");
    }

    static flatMap3<A, B, C, D, E>(
        e1: Either<A, B>,
        e2: Either<A, C>,
        e3: Either<A, D>,
        f: (a: B, b: C, c: D) => Either<A, E>,
    ): Either<A, E> {
        if (e1.isRight() && e2.isRight() && e3.isRight()) {
            return f(e1.get(), e2.get(), e3.get());
        } else if (e1.isLeft()) {
            return e1;
        } else if (e2.isLeft()) {
            return e2;
        } else if (e3.isLeft()) {
            return e3;
        }
        throw new Error("Either.flatMap error");
    }

    static flatMap4<A, B, C, D, E, F>(
        e1: Either<A, B>,
        e2: Either<A, C>,
        e3: Either<A, D>,
        e4: Either<A, E>,
        f: (a: B, b: C, c: D, d: E) => Either<A, F>,
    ): Either<A, F> {
        if (e1.isRight() && e2.isRight() && e3.isRight() && e4.isRight()) {
            return f(e1.get(), e2.get(), e3.get(), e4.get());
        } else if (e1.isLeft()) {
            return e1;
        } else if (e2.isLeft()) {
            return e2;
        } else if (e3.isLeft()) {
            return e3;
        } else if (e4.isLeft()) {
            return e4;
        }
        throw new Error("Either.flatMap error");
    }

    static flatMap5<A, B, C, D, E, F, G>(
        e1: Either<A, B>,
        e2: Either<A, C>,
        e3: Either<A, D>,
        e4: Either<A, E>,
        e5: Either<A, F>,
        f: (a: B, b: C, c: D, d: E, e: F) => Either<A, G>,
    ): Either<A, G> {
        if (e1.isRight() && e2.isRight() && e3.isRight() && e4.isRight() && e5.isRight()) {
            return f(e1.get(), e2.get(), e3.get(), e4.get(), e5.get());
        } else if (e1.isLeft()) {
            return e1;
        } else if (e2.isLeft()) {
            return e2;
        } else if (e3.isLeft()) {
            return e3;
        } else if (e4.isLeft()) {
            return e4;
        } else if (e5.isLeft()) {
            return e5;
        }
        throw new Error("Either.flatMap error");
    }

    static leftTap<A, B>(val: Either<B, A>, f: (b: B) => void): Either<B, A> {
        if (val.isLeft()) {
            f(val.value);
        }
        return val;
    }

    static liftEither<A>(val: A, error: string): Either<string, A> {
        return this.toEither(Option.of(val), error);
    }

    static toEither<A, B>(opt: Option<A>, error: B): Either<B, A> {
        if (opt.isEmpty()) {
            return Left(error);
        }
        return Right(opt.get());
    }

}
