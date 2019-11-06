import {Request, Response} from "express";
import {GetEndpoint} from "../../core/server/get-endpoint";
import {Database} from "../../db";

export class Home extends GetEndpoint {

    constructor(readonly db: Database) {
        super("/home");
    }

    runRequest(req: Request, res: Response): void {
        res.sendfile("views/home.hbs");
    }

}
