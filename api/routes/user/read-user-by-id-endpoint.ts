import {GetEndpoint} from "../get-endpoint";
import {Request, Response} from "express";
import {Database} from "../../db/database";
import {List} from "immutable";

export class ReadUserByIdEndpoint extends GetEndpoint {

    constructor(private db: Database) {
        super('/user/:id');
    }

    isAuthorized(): boolean {
        return true;
    }

    async run(req: Request, res: Response): Promise<void> {
        const response = await this.db.requests.sendRequestEither('ssp_json_GetUser', List.of(`@UserId = 1`));
        res.send(response.value);
    }

}
