import {GetEndpoint} from "../get-endpoint";
import {Request, Response} from "express";
import {Database} from "../../db/database";
import {List} from "immutable";
import {UserJsonSerializer} from "../../../core/src/models/user";
import {JsonBuilder} from "../../../core/src/misc/json-builder";

export class ReadUserByIdEndpoint extends GetEndpoint {

    constructor(private db: Database) {
        super('/user/:id');
    }

    isAuthorized(): boolean {
        return true;
    }

    async run(req: Request, res: Response): Promise<void> {
        const response = await this.db.requests.sendRequest('ssp_json_GetUser', List.of(`@UserId = 1`));
        response.map(x => {
            res.send(UserJsonSerializer.instance.toJson(UserJsonSerializer.instance.fromJson(x), new JsonBuilder({})));
        })
    }
}
