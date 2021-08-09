import {Either, Left, Option, Right} from "funfix-core";

export class EitherUtils {

    static flatMap2<A, B, C, D>(
        e1: Either<A, B>,
        e2: Either<A, C>,
        f: (a: B, b: C) => Either<A, D>,
    ): Either<A, D> {
        if (e1.isLeft()) {
            return e1;
        } else if (e2.isLeft()) {
            return e2;
        }
        return f(e1.get(), e2.get());
    }

    static flatMap3<A, B, C, D, E>(
        e1: Either<A, B>,
        e2: Either<A, C>,
        e3: Either<A, D>,
        f: (a: B, b: C, c: D) => Either<A, E>,
    ): Either<A, E> {
        if (e1.isLeft()) {
            return e1;
        } else if (e2.isLeft()) {
            return e2;
        } else if(e3.isLeft()) {
            return e3;
        }
        return f(e1.get(), e2.get(), e3.get());
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

    static sequence<A>(ep: Either<any, Promise<Either<any, A>>>): Promise<Either<any, A>> {
        if (ep.isLeft()) {
            return Promise.resolve(Left(ep.value));
        }
        return ep.get();
    }

    static toEither<A>(value: Option<A>, left: string): Either<string, A> {
        return value.map(v => Right(v))
            .getOrElse(Left(left));
    }

}
