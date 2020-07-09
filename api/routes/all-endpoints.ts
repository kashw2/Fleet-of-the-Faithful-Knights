import {Router} from "express";
import {Database} from "../db/database";
import {ListCandidatesEndpoint} from "./candidates/list/list-candidates-endpoint";
import {WriteCandidatesEndpoint} from "./candidates/write/write-candidates-endpoint";
import {WriteCommentEndpoint} from "./comments/write/write-comment-endpoint";
import {ListNewsEndpoint} from "./news/list/list-news-endpoint";
import {ListUsersByGroupEndpoint} from "./users/list/list-users-by-group-endpoint";
import {ReadUserByIdEndpoint} from "./users/read/read-user-by-id-endpoint";
import {ReadUserByTokenEndpoint} from "./users/read/read-user-by-token-endpoint";
import {ReadUserByUsernameEndpoint} from "./users/read/read-user-by-username-endpoint";
import {UserRegisterEndpoint} from "./users/write/user-register-endpoint";
import {ListRecentVotesEndpoint} from "./votes/list/list-recent-votes-endpoint";
import {ListVotesBySponsorEndpoint} from "./votes/list/list-votes-by-sponsor-endpoint";
import {ListVotesEndpoint} from "./votes/list/list-votes-endpoint";
import {ListVotesPassedEndpoint} from "./votes/list/list-votes-passed-endpoint";
import {ReadVoteByIdEndpoint} from "./votes/read/read-vote-by-id-endpoint";
import {WriteVoteEndpoint} from "./votes/write/write-vote-endpoint";
import {WriteVoteResponseEndpoint} from "./votes/write/write-vote-response-endpoint";
import {ListMissingCandidatesEndpoint} from "./candidates/list/list-missing-candidates-endpoint";
import {ListUsersEndpoint} from "./users/list/list-users-endpoint";
import {ListPermissionsEndpoint} from "./permissions/list/list-permissions-endpoint";
import {ListGroupsEndpoint} from "./groups/list/list-groups-endpoint";

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
        new ListVotesBySponsorEndpoint(db).routeEndpoint(router);
        new ListVotesPassedEndpoint(db).routeEndpoint(router);
        new ListRecentVotesEndpoint(db).routeEndpoint(router);
        new WriteVoteEndpoint(db).routeEndpoint(router);
        new WriteCandidatesEndpoint(db).routeEndpoint(router);
        new ListCandidatesEndpoint(db).routeEndpoint(router);
        new WriteCommentEndpoint(db).routeEndpoint(router);
        new WriteVoteResponseEndpoint(db).routeEndpoint(router);
        new ListMissingCandidatesEndpoint(db).routeEndpoint(router);
        new ListUsersEndpoint(db).routeEndpoint(router);
        new ListPermissionsEndpoint(db).routeEndpoint(router);
        new ListGroupsEndpoint(db).routeEndpoint(router);
    }

}
