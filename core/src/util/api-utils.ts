import {Either} from "funfix-core";
import {EitherUtils} from "./either-utils";
import {Request} from 'express';

export class ApiUtils {

    // Don't know if these methods will show in the stacktrace so good error messages might be a requirement
    static parseNumberFromPath(req: Request, key: string): Either<string, number> {
        return EitherUtils.liftEither(+req.params[key], `${key} does not exist on object`);
    }

}
