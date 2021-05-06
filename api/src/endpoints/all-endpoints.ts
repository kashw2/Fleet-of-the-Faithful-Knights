import {Router} from "express";
import {UserEndpoint} from "./user-endpoint";
import {Database} from "../db/database";
import {GroupEndpoint} from "./group-endpoint";
import {PermissionsEndpoint} from "./permission-endpoint";
import {UserPermissionMappingEndpoint} from "./user-permission-mapping-endpoint";

export class AllEndpoints {

    static initialiseEndpoints(router: Router, db: Database): void {
        new UserEndpoint(db).mount(router);
        new GroupEndpoint(db).mount(router);
        new PermissionsEndpoint(db).mount(router);
        new UserPermissionMappingEndpoint(db).mount(router);
    }

}
