import {Router} from "express";
import {UserEndpoint} from "./user-endpoint";

export class Endpoints {

    static mountCrudRoutes(router: Router): void {
        new UserEndpoint().mount(router);
    }

    static mountEndpoints(router: Router): void {
        this.mountCrudRoutes(router);
    }

}
