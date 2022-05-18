import {DbRequest} from "../db-request";
import {Either} from "funfix-core";
import {
  Ballot,
  BallotJsonSerializer,
  Candidate,
  CandidateJsonSerializer,
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
import {Future} from "funfix";

export class DbRead {

  constructor(private requests: DbRequest) {
  }

  readBallots(): Future<Either<string, List<Ballot>>> {
    return this.requests.sendRequestListSerialized('ssp_json_GetBallots', List(), BallotJsonSerializer.instance);
  }

  readCandidates(): Future<Either<string, List<Candidate>>> {
    return this.requests.sendRequestListSerialized('ssp_json_GetCandidates', List(), CandidateJsonSerializer.instance);
  }

  readGroups(): Future<Either<string, List<Group>>> {
    return this.requests.sendRequestListSerialized('ssp_json_GetGroups', List(), GroupJsonSerializer.instance);
  }

  readPermissions(): Future<Either<string, List<Permission>>> {
    return this.requests.sendRequestListSerialized('ssp_json_GetPermissions', List(), PermissionJsonSerializer.instance);
  }

  readUserByDiscordId(discordId: string): Future<Either<string, User>> {
    return this.requests.sendRequestSerialized('ssp_json_GetUser', List.of(`@DiscordId = '${discordId}'`), UserJsonSerializer.instance);
  }

  readUserPermissionMappings(userId: string): Future<Either<string, List<UserPermissionMapping>>> {
    return this.requests.sendRequestListSerialized('ssp_json_GetUserPermissionMappings', List.of(`@UserId = ${userId}`), UserPermissionMappingJsonSerializer.instance);
  }

  readUsers(): Future<Either<string, List<User>>> {
    return this.requests.sendRequestListSerialized('ssp_json_GetUsers', List(), UserJsonSerializer.instance);
  }

  readVotes(): Future<Either<string, List<Vote>>> {
    return this.requests.sendRequestListSerialized('ssp_json_GetVotes', List(), VoteJsonSerializer.instance);
  }

}
