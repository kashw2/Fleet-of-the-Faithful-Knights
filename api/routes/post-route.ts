import {RouteManager} from "./route-manager";

export class PostRoute extends RouteManager {

    constructor(endpoint: string) {
        super();
    }

    isAuthorized(): boolean {
        return false;
    }

}
