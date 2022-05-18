import {Router} from "express";
import {Database} from "../db/database";
import {BallotEndpoint} from "./ballot-endpoint";
import {CandidateEndpoint} from "./candidate-endpoint";
import {UserPermissionMappingEndpoint} from "./user-permission-mapping-endpoint";
import {PermissionsEndpoint} from "./permission-endpoint";
import {GroupEndpoint} from "./group-endpoint";
import {VotesEndpoint} from "./votes-endpoint";
import {UserEndpoint} from "./user-endpoint";

export class AllEndpoints {

  static initialiseEndpoints(router: Router, db: Database): void {
    new UserEndpoint(db).mount(router);
    new GroupEndpoint(db).mount(router);
    new PermissionsEndpoint(db).mount(router);
    new UserPermissionMappingEndpoint(db).mount(router);
    new VotesEndpoint(db).mount(router);
    new BallotEndpoint(db).mount(router);
    new CandidateEndpoint(db).mount(router);
  }

}
