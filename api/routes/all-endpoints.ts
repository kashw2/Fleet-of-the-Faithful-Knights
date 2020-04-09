import {Router} from "express";
import {Database} from "../db/database";
import {ListNewsEndpoint} from "./news/list-news-endpoint";
import {ListUsersByGroupEndpoint} from "./user/list/list-users-by-group-endpoint";
import {ReadUserByIdEndpoint} from "./user/read/read-user-by-id-endpoint";
import {ReadUserByTokenEndpoint} from "./user/read/read-user-by-token-endpoint";
import {ReadUserByUsernameEndpoint} from "./user/read/read-user-by-username-endpoint";
import {UserRegisterEndpoint} from "./user/user-register-endpoint";
import {ListVotesEndpoint} from "./votes/list/list-votes-endpoint";
import {ReadVoteByIdEndpoint} from "./votes/read/read-vote-by-id-endpoint";
import {ListVotesByUserEndpoint} from "./votes/list/list-votes-by-user-endpoint";
import {ListVotesPassedEndpoint} from "./votes/list/list-votes-passed-endpoint";

export class AllEndpoints {

    static initialiseEndpoints(router: Router, db: Database): void {
        new ReadUserByIdEndpoint(db).routeEndpoint(router);
        new ReadUserByUsernameEndpoint(db).routeEndpoint(router);
        new ListUsersByGroupEndpoint(db).routeEndpoint(router);
        new UserRegisterEndpoint(db).routeEndpoint(router);
        new ReadUserByTokenEndpoint(db).routeEndpoint(router);
        new ListNewsEndpoint(db).routeEndpoint(router);
        new ListVotesEndpoint(db).routeEndpoint(router);
        new ReadVoteByIdEndpoint(db).routeEndpoint(router);
        new ListVotesByUserEndpoint(db).routeEndpoint(router);
        new ListVotesPassedEndpoint(db).routeEndpoint(router);
    }

}
