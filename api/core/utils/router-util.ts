import {Request, Response} from "express";
import {Either} from "funfix-core";
import {JsonSerializer} from "..";
import {EitherUtils} from "./either-utils";

export class RouterUtil {

    static parseBooleanBodyParam(key: string, req: Request): Either<string, boolean> {
        return EitherUtils.liftEither(req.body[key], `error parsing body param ${key}`);
    }

    static parseNumberBodyParam(key: string, req: Request): Either<string, number> {
        return EitherUtils.liftEither(req.body[key], `error parsing body param ${key}`);
    }

    static parseSerializedBodyParam<A>(key: string, serializer: JsonSerializer<A>, req: Request): Either<string, A> {
        return EitherUtils.liftEither(serializer.toType(req.body[key]), `error parsing body param ${key}`);
    }

    static parseStringBodyParam(key: string, req: Request): Either<string, string> {
        return EitherUtils.liftEither(req.body[key], `error parsing body param ${key}`);
    }

    static redirectResult(value: Either<string, string>, res: Response): void {
        if (value.isLeft()) {
            res.send(value.value);
        } else {
            res.redirect(value.get());
        }
    }

    static sendResult<A>(value: Either<string, A>, res: Response): void {
        if (value.isLeft()) {
            res.send(value.value);
        } else {
            res.send(value.get());
        }
    }

    static sendUnauthorisedViaRouter(res: Response): void {
        res.sendStatus(403);
    }

}
