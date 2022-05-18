import {DbRequest} from "../db-request";
import {Either} from "funfix-core";
import {
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

export class DbDelete {

  constructor(private requests: DbRequest) {
  }

  deleteCandidate(candidateId: string): Future<Either<string, Candidate>> {
    return this.requests.sendRequestSerialized('ssp_json_DeleteCandidate', List.of(`@CandidateId = ${candidateId}`), CandidateJsonSerializer.instance);
  }

  deleteGroup(groupId: string): Future<Either<string, Group>> {
    return this.requests.sendRequestSerialized('ssp_json_DeleteGroup', List.of(`@GroupId = ${groupId}`), GroupJsonSerializer.instance);
  }

  deletePermission(permissionId: string): Future<Either<string, Permission>> {
    return this.requests.sendRequestSerialized('ssp_json_DeletePermission', List.of(`@PermissionId = ${permissionId}`), PermissionJsonSerializer.instance);
  }

  deleteUser(userId: string): Future<Either<string, User>> {
    return this.requests.sendRequestSerialized('ssp_json_DeleteUser', List.of(`@UserId = ${userId}`), UserJsonSerializer.instance);
  }

  deleteUserPermissionMapping(mappingId: string): Future<Either<string, UserPermissionMapping>> {
    return this.requests.sendRequestSerialized('ssp_json_DeleteUserPermissionMapping', List.of(`@MappingId = ${mappingId}`), UserPermissionMappingJsonSerializer.instance);
  }

  deleteVote(voteId: string): Future<Either<string, Vote>> {
    return this.requests.sendRequestSerialized('ssp_json_DeleteVote', List.of(`@VoteId = ${voteId}`), VoteJsonSerializer.instance);
  }

}
