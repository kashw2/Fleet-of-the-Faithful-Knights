import {DbRequest} from "../db-request";
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
import {Either} from "funfix-core";
import {List} from "immutable";
import {Future} from "funfix";

export class DbUpdate {

  constructor(private request: DbRequest) {
  }

  updateCandidate(candidate: Candidate, candidateId: string): (modifiedBy: string) => Future<Either<string, Candidate>> {
    return (modifiedBy: string) => {
      return this.request.sendRequestSerialized(
        'ssp_json_UpdateCandidate',
        List.of(
          `@Json, = '${CandidateJsonSerializer.instance.toJsonString(candidate)}'`,
          `@CandidateId = ${candidateId}`,
          `@ModifiedBy = '${modifiedBy}'`,
        ),
        CandidateJsonSerializer.instance);
    };
  }

  updateGroup(group: Group): (modifiedBy: string) => Future<Either<string, Group>> {
    return (modifiedBy: string) => {
      return this.request.sendRequestSerialized('ssp_json_UpdateGroup', List.of(`@Json = '${GroupJsonSerializer.instance.toJsonString(group)}'`, `@ModifiedBy = '${modifiedBy}'`), GroupJsonSerializer.instance);
    };
  }

  updatePermission(permission: Permission): (modifiedBy: string) => Future<Either<string, Permission>> {
    return (modifiedBy: string) => {
      return this.request.sendRequestSerialized('ssp_json_UpdatePermission', List.of(`@Json = '${PermissionJsonSerializer.instance.toJsonString(permission)}'`, `@ModifiedBy = '${modifiedBy}'`), PermissionJsonSerializer.instance);
    };
  }

  updateUser(user: User): (modifiedBy: string) => Future<Either<string, User>> {
    return (modifiedBy: string) => {
      return this.request.sendRequestSerialized('ssp_json_UpdateUser', List.of(`@Json = '${UserJsonSerializer.instance.toJsonString(user)}'`, `@ModifiedBy = '${modifiedBy}'`), UserJsonSerializer.instance);
    };
  }

  updateUserPermissionMapping(mapping: UserPermissionMapping): (modifiedBy: string) => Future<Either<string, UserPermissionMapping>> {
    return (modifiedBy: string) => {
      return this.request.sendRequestSerialized('ssp_json_UpdateUserPermissionMapping', List.of(`@Json = '${UserPermissionMappingJsonSerializer.instance.toJsonString(mapping)}'`, `@ModifiedBy = '${modifiedBy}'`), UserPermissionMappingJsonSerializer.instance);
    };
  }

  updateVote(vote: Vote): (modifiedBy: string) => Future<Either<string, Vote>> {
    return (modifiedBy: string) => {
      return this.request.sendRequestSerialized('ssp_json_UpdateVote', List.of(`@Json = '${VoteJsonSerializer.instance.toJsonString(vote)}'`, `@ModifiedBy = '${modifiedBy}'`), VoteJsonSerializer.instance);
    };
  }

}
