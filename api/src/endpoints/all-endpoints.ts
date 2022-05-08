import {Router} from "express";
import {Database} from "../db/database";
import {BallotEndpoint} from "./ballot-endpoint";
import {CandidateEndpoint} from "./candidate-endpoint";

export class AllEndpoints {

    static initialiseEndpoints(router: Router, db: Database): void {
        // new UserEndpoint(db).mount(router);
        // new GroupEndpoint(db).mount(router);
        // new PermissionsEndpoint(db).mount(router);
        // new UserPermissionMappingEndpoint(db).mount(router);
        // new VotesEndpoint(db).mount(router);
        new BallotEndpoint(db).mount(router);
        new CandidateEndpoint(db).mount(router);
    }

}
