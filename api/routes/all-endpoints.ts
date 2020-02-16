import {ReadUserByIdEndpoint} from "./user/read-user-by-id-endpoint";
import {Router} from "express";
import {Database} from "../db/database";

export class AllEndpoints {

    static initialiseEndpoints(router: Router, db: Database): void {
        new ReadUserByIdEndpoint(db).routeEndpoint(router);
    }

}
