import {Router} from "express";
import {UserEndpoint} from "./user-endpoint";
import {Database} from "../db/database";

export class AllEndpoints {

    static initialiseEndpoints(router: Router, db: Database): void {
        new UserEndpoint(db).mount(router);
    }

}
