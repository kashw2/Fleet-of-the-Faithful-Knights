import {Request, Response} from "express";
import {Either} from "funfix-core";
import {EitherUtils} from "./either-utils";

export class RouterUtil {

    static parseBooleanBodyParam(key: string, req: Request): Either<string, boolean> {
        // @ts-ignore
        return EitherUtils.liftEither(req.body[key], `error parsing body param ${key}`);
    }

    static parseNumberBodyParam(key: string, req: Request): Either<string, number> {
        // @ts-ignore
        return EitherUtils.liftEither(req.body[key], `error parsing body param ${key}`);
    }

    static parseStringBodyParam(key: string, req: Request): Either<string, string> {
        // @ts-ignore
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

    static sendUnauthorised(res: Response): void {
        res.sendStatus(403);
    }

}
