import {Either} from "funfix-core";
import {EitherUtils} from "./either-utils";
import {Request, Response} from 'express';
import {SimpleJsonSerializer} from "../misc/simple-json-serializer";
import {Collection, List} from "immutable";

export class ApiUtils {

    // Don't know if these methods will show in the stacktrace so good error messages might be a requirement
    static parseNumberFromPath(req: Request, key: string): Either<string, number> {
        return EitherUtils.liftEither(+req.params[key], `${key} does not exist on object`);
    }

    static parseSerializedFromBody<T>(req: Request, key: string, serializer: SimpleJsonSerializer<T>): Either<string, T> {
        return EitherUtils.liftEither(serializer.fromJson(req.body[key]), `unable to serialize ${key} from body`);
    }

    static parseStringFromPath(req: Request, key: string): Either<string, string> {
        return EitherUtils.liftEither(req.params[key], `${key} does not exist on object`);
    }

    static sendResult<A>(req: Either<string, A>, res: Response): void {
        if (req.isLeft()) {
            res.send(req.value);
            return;
        }
        res.send(req.get());
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
        res.send(serializer.toJson(req.get()));
    }

}
