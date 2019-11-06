import {Request, Response} from "express";

export class RouterUtil {

    static sendUnauthorisedViaRouter(req: Request, res: Response): void {
        res.sendStatus(403);
    }

}
