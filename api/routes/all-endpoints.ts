import {Router} from "express";
import {Database} from "../db";
import {UserEndpoints} from "./users/user-endpoints";

export class AllEndpoints {

    static initialiseEndpoints(db: Database, router: Router): void {
        UserEndpoints.initialiseEndpoints(db, router);
    }

}
