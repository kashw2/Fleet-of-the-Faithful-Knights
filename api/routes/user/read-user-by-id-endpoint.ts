import {GetEndpoint} from "../get-endpoint";
import {Request, Response} from "express";

export class ReadUserByIdEndpoint extends GetEndpoint {

    constructor() {
        super('/user/:id');
    }

    isAuthorized(): boolean {
        return true;
    }

    run(req: Request, res: Response): void {
        res.send('Hello World');
        return;
    }

}
