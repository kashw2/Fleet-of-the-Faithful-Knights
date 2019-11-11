import {Router} from "express";
import {Database} from "../../database/db";
import {GetUserEndpoint} from "./endpoints/get-user-endpoint";

export class UserEndpoints {

    static initialiseEndpoints(db: Database, router: Router): void {
        new GetUserEndpoint(db).route(router);
    }

}
