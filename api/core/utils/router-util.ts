import {Response} from "express";
import {Either} from "funfix-core";

export class RouterUtil {

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
