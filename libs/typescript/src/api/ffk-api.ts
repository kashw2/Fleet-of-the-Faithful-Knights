import {CrudApiBase} from "@kashw2/lib-util";

export class FfkApi {

    constructor(private uri: string) {
    }

    ballot(): CrudApiBase {
        return new CrudApiBase(this.uri, 'ballot');
    }

    ballotCreate(vid: string): CrudApiBase {
        return new CrudApiBase(this.uri, `ballot?vote_id=${vid}`);
    }

    candidate(): CrudApiBase {
        return new CrudApiBase(this.uri, 'candidate');
    }

    candidateById(cid: number): CrudApiBase {
        return new CrudApiBase(this.uri, `candidate?candidate_id=${cid}`);
    }

    candidateSingle(): CrudApiBase {
        return new CrudApiBase(this.uri, `candidate?single=true`);
    }

    group(): CrudApiBase {
        return new CrudApiBase(this.uri, 'group');
    }

    groupById(gid: number): CrudApiBase {
        return new CrudApiBase(this.uri, `group?group_id${gid}`);
    }

    permission(): CrudApiBase {
        return new CrudApiBase(this.uri, 'permission');
    }

    permissionById(pid: number): CrudApiBase {
        return new CrudApiBase(this.uri, `permission?permission_id${pid}`);
    }

    user(): CrudApiBase {
        return new CrudApiBase(this.uri, 'user');
    }

    userByDiscordId(discordToken: string): CrudApiBase {
        return new CrudApiBase(this.uri, `user?discord_token=${discordToken}`);
    }

    userById(uid: number): CrudApiBase {
        return new CrudApiBase(this.uri, `user?user_id=${uid}`);
    }

    userCurrent(): CrudApiBase {
        return new CrudApiBase(this.uri, `user?current=true`);
    }

    userPermissionMapping(uid: number): CrudApiBase {
        return new CrudApiBase(this.uri, `user/${uid}/permission/mapping`);
    }

    vote(): CrudApiBase {
        return new CrudApiBase(this.uri, 'vote');
    }

    voteById(vid: number): CrudApiBase {
        return new CrudApiBase(this.uri, `vote?vote_id=${vid}`);
    }

}