import {DbRequest} from "../db-request";
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
import {Either} from "funfix-core";
import {List} from "immutable";
import {Future} from "funfix";

export class DbInsert {

  constructor(private requests: DbRequest) {
  }

  insertBallot(ballot: Ballot, voteId: string): (modifiedBy: string) => Future<Either<string, Ballot>> {
    return (modifiedBy: string) => {
      return this.requests.sendRequestSerialized(
        'ssp_json_InsertBallot',
        List.of(
          `@Json = '${BallotJsonSerializer.instance.toJsonString(ballot)}'`,
          `@VoteId = '${voteId}'`,
          `@ModifiedBy = '${modifiedBy}'`,
        ),
        BallotJsonSerializer.instance
      );
    };
  }

  insertCandidate(candidates: Candidate): (modifiedBy: string) => Future<Either<string, Candidate>> {
    return (modifiedBy: string): Future<Either<string, Candidate>> => {
      return this.requests.sendRequestSerialized(
        'ssp_json_InsertCandidate',
        List.of(
          `@Json = '${CandidateJsonSerializer.instance.toJsonString(candidates)}'`,
          `@ModifiedBy = '${modifiedBy}'`,
        ),
        CandidateJsonSerializer.instance
      );
    };
  }

  insertCandidates(candidates: List<Candidate>): (modifiedBy: string) => Future<Either<string, List<Candidate>>> {
    return (modifiedBy: string): Future<Either<string, List<Candidate>>> => {
      return this.requests.sendRequestListSerialized(
        'ssp_json_InsertCandidates',
        List.of(
          `@Json = '${CandidateJsonSerializer.instance.toJsonStringArray(candidates.toArray())}'`,
          `@ModifiedBy = '${modifiedBy}'`,
        ),
        CandidateJsonSerializer.instance
      );
    };
  }

  insertGroup(group: Group): (modifiedBy: string) => Future<Either<string, Group>> {
    return (modifiedBy: string): Future<Either<string, Group>> => {
      return this.requests.sendRequestSerialized(
        'ssp_json_InsertGroup',
        List.of(
          `@Json = '${GroupJsonSerializer.instance.toJsonString(group)}'`,
          `@ModifiedBy = '${modifiedBy}'`,
        ),
        GroupJsonSerializer.instance,
      );
    };
  }

  insertPermission(permission: Permission): (modifiedBy: string) => Future<Either<string, Permission>> {
    return (modifiedBy: string): Future<Either<string, Permission>> => {
      return this.requests.sendRequestSerialized(
        'ssp_json_InsertPermission',
        List.of(
          `@Json = '${PermissionJsonSerializer.instance.toJsonString(permission)}'`,
          `@ModifiedBy = '${modifiedBy}'`),
        PermissionJsonSerializer.instance,
      );
    };
  }

  insertUser(user: User): (modifiedBy: string) => Future<Either<string, User>> {
    return (modifiedBy: string): Future<Either<string, User>> => {
      return this.requests.sendRequestSerialized(
        'ssp_json_InsertUser',
        List.of(
          `@Json = '${UserJsonSerializer.instance.toJsonString(user)}'`,
          `@ModifiedBy = '${modifiedBy}'`),
        UserJsonSerializer.instance,
      );
    };
  }

  insertUserPermissionMapping(userPermissionMapping: UserPermissionMapping): (modifiedBy: string) => Future<Either<string, UserPermissionMapping>> {
    return (modifiedBy: string): Future<Either<string, UserPermissionMapping>> => {
      return this.requests.sendRequestSerialized(
        'ssp_json_InsertUserPermissionMapping',
        List.of(
          `@Json = '${UserPermissionMappingJsonSerializer.instance.toJsonString(userPermissionMapping)}'`,
          `@ModifiedBy = '${modifiedBy}'`,
        ),
        UserPermissionMappingJsonSerializer.instance,
      );
    };
  }

  insertVote(vote: Vote): (modifiedBy: string) => Future<Either<string, Vote>> {
    return (modifiedBy: string): Future<Either<string, Vote>> => {
      return this.requests.sendRequestSerialized(
        'ssp_json_InsertVote',
        List.of(
          `@Json = '${VoteJsonSerializer.instance.toJsonString(vote)}'`,
          `@ModifiedBy = '${modifiedBy}'`,
        ),
        VoteJsonSerializer.instance,
      );
    };
  }

}
