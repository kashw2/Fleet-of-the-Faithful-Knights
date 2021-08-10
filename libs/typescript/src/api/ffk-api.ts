import {CrudApiBase} from "./crud-api-base";

export class FfkApi {

    constructor(private uri: string) {
    }

    ballot(): CrudApiBase {
        return new CrudApiBase(this.uri, 'ballot');
    }

    candidate(): CrudApiBase {
        return new CrudApiBase(this.uri, 'candidate');
    }

    group(): CrudApiBase {
        return new CrudApiBase(this.uri, 'group');
    }

    permission(): CrudApiBase {
        return new CrudApiBase(this.uri, 'permission');
    }

    user(): CrudApiBase {
        return new CrudApiBase(this.uri, 'user');
    }

    userPermissionMapping(uid: number): CrudApiBase {
        return new CrudApiBase(this.uri, `user/${uid}/permission/mapping`);
    }

    vote(): CrudApiBase {
        return new CrudApiBase(this.uri, 'vote');
    }

}