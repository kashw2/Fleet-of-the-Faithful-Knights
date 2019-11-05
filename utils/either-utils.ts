import {Either, Left, Option, Right} from "funfix-core";

export class EitherUtils {

    flatMap2<A, B, C, D>(
        fn1: Either<A, B>,
        fn2: Either<A, C>,
        f: (a: B, b: C) => Either<A, D>,
    ): Either<A, D> {
        if (fn1.isRight() && fn2.isRight()) {
            return f(fn1.get(), fn2.get());
        } else if (fn1.isLeft()) {
            return fn1;
        } else if (fn2.isLeft()) {
            return fn2;
        }
        throw new Error("Either flatMap2 error");
    }

    liftEither<A>(val: A, error: string): Either<string, A> {
        return this.toEither(Option.of(val), error);
    }

    toEither<A>(opt: Option<A>, error: string): Either<string, A> {
        if (opt.isEmpty()) {
            return Left(error);
        }
        return Right(opt.get());
    }

}
