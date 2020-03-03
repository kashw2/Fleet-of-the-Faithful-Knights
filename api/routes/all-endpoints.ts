import {ReadUserByIdEndpoint} from "./user/read/read-user-by-id-endpoint";
import {Router} from "express";
import {Database} from "../db/database";
import {ListUsersByGroupEndpoint} from "./user/list/list-users-by-group-endpoint";
import {ReadUserByUsernameEndpoint} from "./user/read/read-user-by-username-endpoint";
import {UserLoginEndpoint} from "./user/user-login-endpoint";
import {ListNewsEndpoint} from "./news/list-news-endpoint";

export class AllEndpoints {

    static initialiseEndpoints(router: Router, db: Database): void {
        new ReadUserByIdEndpoint(db).routeEndpoint(router);
        new ReadUserByUsernameEndpoint(db).routeEndpoint(router);
        new ListUsersByGroupEndpoint(db).routeEndpoint(router);
        new UserLoginEndpoint(db).routeEndpoint(router);
        new ListNewsEndpoint(db).routeEndpoint(router);
    }

}
