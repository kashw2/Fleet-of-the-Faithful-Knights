import {Router} from "express";
import {Database} from "../db/database";
import {ListNewsEndpoint} from "./news/list-news-endpoint";
import {ListUsersByGroupEndpoint} from "./user/list/list-users-by-group-endpoint";
import {ReadUserByIdEndpoint} from "./user/read/read-user-by-id-endpoint";
import {ReadUserByUsernameEndpoint} from "./user/read/read-user-by-username-endpoint";
import {UserRegisterEndpoint} from "./user/user-register-endpoint";

export class AllEndpoints {

    static initialiseEndpoints(router: Router, db: Database): void {
        new ReadUserByIdEndpoint(db).routeEndpoint(router);
        new ReadUserByUsernameEndpoint(db).routeEndpoint(router);
        new ListUsersByGroupEndpoint(db).routeEndpoint(router);
        new UserRegisterEndpoint(db).routeEndpoint(router);
        new ListNewsEndpoint(db).routeEndpoint(router);
    }

}
