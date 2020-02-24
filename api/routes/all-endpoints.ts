import {ReadUserByIdEndpoint} from "./user/read-user-by-id-endpoint";
import {Router} from "express";
import {Database} from "../db/database";
import {ListUsersByGroupEndpoint} from "./user/list-users-by-group-endpoint";
import {ReadUserByUsernameEndpoint} from "./user/read-user-by-username-endpoint";

export class AllEndpoints {

    static initialiseEndpoints(router: Router, db: Database): void {
        new ReadUserByIdEndpoint(db).routeEndpoint(router);
        new ReadUserByUsernameEndpoint(db).routeEndpoint(router);
        new ListUsersByGroupEndpoint(db).routeEndpoint(router);
    }

}
