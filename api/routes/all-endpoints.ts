import {ReadUserByIdEndpoint} from "./user/read-user-by-id-endpoint";
import {Router} from "express";

export class AllEndpoints {

    static initialiseEndpoints(router: Router): void {
        new ReadUserByIdEndpoint().routeEndpoint(router);
    }

}
