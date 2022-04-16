import {DbRequest} from "../db-request";
import {Either} from "funfix";
import {
    Ballot, BallotJsonSerializer, Candidate, CandidateJsonSerializer,
    Group,
    GroupJsonSerializer,
    Permission,
    PermissionJsonSerializer,
    User,
    UserJsonSerializer,
    UserPermissionMapping,
    UserPermissionMappingJsonSerializer,
    Vote,
    VoteJsonSerializer
} from "@kashw2/lib-ts";
import {List} from "immutable";

export class DbRead {

    constructor(private requests: DbRequest) {
    }

    readBallots(): Promise<Either<string, List<Ballot>>> {
        return this.requests.sendRequestListSerialized('ssp_json_GetBallots', List(), BallotJsonSerializer.instance);
    }

    readCandidates(): Promise<Either<string, List<Candidate>>> {
        return this.requests.sendRequestListSerialized('ssp_json_GetCandidates', List(), CandidateJsonSerializer.instance);
    }

    readGroups(): Promise<Either<string, List<Group>>> {
        return this.requests.sendRequestListSerialized('ssp_json_GetGroups', List(), GroupJsonSerializer.instance);
    }

    readPermissions(): Promise<Either<string, List<Permission>>> {
        return this.requests.sendRequestListSerialized('ssp_json_GetPermissions', List(), PermissionJsonSerializer.instance);
    }

    readUserByDiscordId(discordId: string): Promise<Either<string, User>> {
        return this.requests.sendRequestSerialized('ssp_json_GetUser', List.of(`@DiscordId = '${discordId}'`), UserJsonSerializer.instance);
    }

    readUserPermissionMappings(userId: string): Promise<Either<string, List<UserPermissionMapping>>> {
        return this.requests.sendRequestListSerialized('ssp_json_GetUserPermissionMappings', List.of(`@UserId = ${userId}`), UserPermissionMappingJsonSerializer.instance);
    }

    readUsers(): Promise<Either<string, List<User>>> {
        return this.requests.sendRequestListSerialized('ssp_json_GetUsers', List(), UserJsonSerializer.instance);
    }

    readVotes(): Promise<Either<string, List<Vote>>> {
        return this.requests.sendRequestListSerialized('ssp_json_GetVotes', List(), VoteJsonSerializer.instance);
    }

}
