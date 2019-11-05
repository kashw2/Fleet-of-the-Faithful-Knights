import {Either, Left, Option, Right} from "funfix-core";

export class EitherUtils {

    static flatMap2<A, B, C, D>(
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

    static leftTap<A, B>(val: Either<B, A>, f: (b: B) => void): Either<B, A> {
        if (val.isLeft()) {
            f(val.value);
        }
        return val;
    }

    static liftEither<A>(val: A, error: string): Either<string, A> {
        return this.toEither(Option.of(val), error);
    }

    static toEither<A>(opt: Option<A>, error: string): Either<string, A> {
        if (opt.isEmpty()) {
            return Left(error);
        }
        return Right(opt.get());
    }

}
