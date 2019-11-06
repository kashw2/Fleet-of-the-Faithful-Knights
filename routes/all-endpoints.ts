import {Router} from "express";
import {Database} from "../db";
import {Home} from "./home/home";

export class AllEndpoints {

    static initialiseEndpoints(db: Database, router: Router): void {
        new Home(db).route(router);
    }

}
