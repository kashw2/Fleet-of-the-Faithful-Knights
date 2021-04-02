import {Router} from "express";
import {UserEndpoint} from "./user-endpoint";

export class AllEndpoints {

    static initialiseEndpoints(router: Router): void {
        new UserEndpoint().mount(router);
    }

}
