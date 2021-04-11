import {Request, Response} from "express";
import {Either, Left, Option, Right} from "funfix-core";
import {EitherUtils} from "./either-utils";
import {JsonSerializer} from "./json-serializer";

export class ApiUtils {

    static parseBodyParamSerialized<A>(req: Request, key: string, serializer: JsonSerializer<A>): Either<string, A> {
        return EitherUtils.liftEither(serializer.fromJson(req.body[key]), `Unable to parse body param ${key}`);
    }

    static parseBooleanQueryParam(req: Request, key: string): Either<string, any> {
        return EitherUtils.liftEither(req.query[key], `Unable to parse query param ${key}`);
    }

    static parseStringHeaderParam(req: Request, key: string): Either<string, string> {
        return EitherUtils.liftEither(req.rawHeaders[key], `Unable to parse header ${key}`);
    }

    static parseStringQueryParam(req: Request, key: string): Either<string, string> {
        return EitherUtils.liftEither(req.query[key] as string, `Unable to parse query param ${key}`);
    }

    static parseUrlStringParam(req: Request, key: string): Either<string, string> {
        return EitherUtils.liftEither(req.params[key], `Unable to parse url param ${key}`);
    }

    static send401(res: Response): void {
        res.sendStatus(401);
    }

    static send500(res: Response): void {
        res.sendStatus(500);
    }

    static send505(res: Response): void {
        res.sendStatus(505);
    }

    static sendError(res: Response, error: string): void {
        res.json({error});
    }

}
