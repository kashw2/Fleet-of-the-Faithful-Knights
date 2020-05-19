import {Request, Response} from "express";
import {Either} from "funfix-core";
import {Collection, List} from "immutable";
import {parseBoolean, SimpleJsonSerializer} from "..";
import {EitherUtils} from "./either-utils";

export class ApiUtils {

    static parseBooleanFromQuery(req: Request, key: string): boolean {
        return parseBoolean(req.query[key]).contains(true);
    }

    // Don't know if these methods will show in the stacktrace so good error messages might be a requirement
    static parseNumberFromPath(req: Request, key: string): Either<string, number> {
        return EitherUtils.liftEither(+req.params[key], `${key} does not exist on object`);
    }

    static parseNumberFromQuery(req: Request, key: string): Either<string, number> {
        // @ts-ignore
        return EitherUtils.liftEither(req.query[key], `${key} does not exist in query`);
    }

    static parseSerializedFromBody<T>(req: Request, key: string, serializer: SimpleJsonSerializer<T>): Either<string, T> {
        return EitherUtils.liftEither(serializer.fromJson(req.body[key]), `unable to serialize ${key} from body`);
    }

    static parseSerializedListFromBody<T>(req: Request, key: string, serializer: SimpleJsonSerializer<T>): Either<string, List<T>> {
        return EitherUtils.liftEither(serializer.fromJsonArray(List(req.body[key])), `unable to serialize ${key} from body`);
    }

    static parseStringFromHeader(req: Request, key: string): Either<string, string> {
        // @ts-ignore
        return EitherUtils.liftEither(req.header(key), `${key} is not a valid header`);
    }

    static parseNumberFromHeader(req: Request, key: string): Either<string, number> {
        // @ts-ignore
        return EitherUtils.liftEither(+req.header(key), `${key} is not a valid header`);
    }

    static parseStringFromPath(req: Request, key: string): Either<string, string> {
        return EitherUtils.liftEither(req.params[key], `${key} does not exist on object`);
    }

    static parseStringFromQuery(req: Request, key: string): Either<string, string> {
        // @ts-ignore
        return EitherUtils.liftEither(req.query[key], `${key} does not exist in query`);
    }

    static sendError(req: Either<string, any>, res: Response): void {
        if (req.isLeft()) {
            res.send(req.value);
        }
    }

    static sendResult<A>(req: Either<string, A>, res: Response): void {
        if (req.isLeft()) {
            res.send(req.value);
            return;
        }
        res.send(req.get());
    }

    static sendResultPromise<A>(req: Promise<Either<string, A>>, res: Response): void {
        req.then(x => {
            if (x.isLeft()) {
                res.send(x.value);
                return;
            }
            res.send(x.get());
        })
            .catch(x => {
                console.error(x);
                res.send(x).status(500);
            });
    }

    static sendResultPromiseEffector<A>(req: Promise<Either<string, A>>, res: Response, f: (x: any) => object): void {
        req.then(x => {
            if (x.isLeft()) {
                res.send(x.value);
                return;
            }
            res.send(f(x.get()));
        })
            .catch(x => {
                console.error(x);
                res.send(x).status(500);
            });
    }

    static sendSerializedCollectionResult<A>(req: Either<string, Collection<number, A>>, serializer: SimpleJsonSerializer<A>, res: Response): void {
        if (req.isLeft()) {
            res.send(req.value);
            return;
        }
        res.send(serializer.toJsonArray(req.get()));
    }

    static sendSerializedResponse<A>(req: Either<string, A>, serializer: SimpleJsonSerializer<A>, res: Response): void {
        if (req.isLeft()) {
            res.send(req.value);
            return;
        }
        res.send(serializer.toJsonImpl(req.get()));
    }

}
