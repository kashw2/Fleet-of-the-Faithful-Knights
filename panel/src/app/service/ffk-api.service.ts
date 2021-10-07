import {Inject, Injectable} from '@angular/core';
import {
  Ballot,
  BallotJsonSerializer,
  Candidate,
  CandidateJsonSerializer,
  CrudApiBase,
  Group,
  GroupJsonSerializer,
  User,
  UserJsonSerializer,
  Vote,
  VoteJsonSerializer
} from "@kashw2/lib-ts";
import {Either} from "funfix-core";
import {List} from "immutable";
import {CrudLocalStorageService} from "./crud.service";
import {EitherUtils} from "@kashw2/lib-util";


@Injectable({
  providedIn: 'root'
})
export class FfkApiService {

  constructor(
    @Inject('ffkApiServer') private apiServer: string,
    private crudLocalStorageService: CrudLocalStorageService,
  ) {
  }

  candidate: CrudApiBase = new CrudApiBase(this.apiServer, 'candidate');

  permission: CrudApiBase = new CrudApiBase(this.apiServer, 'permission');
  vote: CrudApiBase = new CrudApiBase(this.apiServer, 'vote');

  ballot: (vid?: string) => CrudApiBase = (vid?: string) => new CrudApiBase(this.apiServer, `ballot?vote_id=${vid}`);

  deleteUser(uid: string): Promise<Either<any, User>> {
    return EitherUtils.sequence(this.getDiscordId()
      .map(did => this.user(did, true)
        .sendDeleteRequest(
          UserJsonSerializer.instance,
          {
            'Discord-Id': did,
            'Access-Control-Allow-Origin': '*'
          },
          {},
        )));
  }

  getBallots(): Promise<Either<string, List<Ballot>>> {
    return EitherUtils.sequence(this.getDiscordId()
      .map(did => this.ballot()
        .sendReadRequestList(
          BallotJsonSerializer.instance,
          {
            'Discord-Id': did,
            'Access-Control-Allow-Origin': '*'
          },
          {},
        )));
  }

  getCandidates(): Promise<Either<string, List<Candidate>>> {
    return EitherUtils.sequence(this.getDiscordId()
      .map(did => this.candidate
        .sendReadRequestList(
          CandidateJsonSerializer.instance,
          {
            'Discord-Id': did,
            'Access-Control-Allow-Origin': '*'
          },
          {},
        )));
  }

  getDiscordId(): Either<string, string> {
    return EitherUtils.toEither(this.crudLocalStorageService.read('discordid'), "Client -> Server Handshake Failed");
  }

  getGroups(): Promise<Either<string, List<Group>>> {
    return EitherUtils.sequence(this.getDiscordId()
      .map(did => this.group()
        .sendReadRequestList(
          GroupJsonSerializer.instance,
          {
            'Discord-Id': did,
            'Access-Control-Allow-Origin': '*'
          },
          {},
        )));
  }

  getUser(): Promise<Either<string, User>> {
    return EitherUtils.sequence(this.getDiscordId()
      .map(did => this.user(did).sendReadRequest(
        UserJsonSerializer.instance,
        {
          'Discord-Id': did,
          'Access-Control-Allow-Origin': '*'
        },
        {},
      )));
  }

  getUsers(): Promise<Either<string, List<User>>> {
    return EitherUtils.sequence(this.getDiscordId()
      .map(did => this.user().sendReadRequestList(
        UserJsonSerializer.instance,
        {
          'Discord-Id': did,
          'Access-Control-Allow-Origin': '*'
        },
        {},
      )));
  }

  getVotes(): Promise<Either<string, List<Vote>>> {
    return EitherUtils.sequence(this.getDiscordId()
      .map(did => this.vote
        .sendReadRequestList(
          VoteJsonSerializer.instance,
          {
            'Discord-Id': did,
            'Access-Control-Allow-Origin': '*'
          },
          {},
        )));
  }

  group: (gid?: number) => CrudApiBase = (gid?: number) => new CrudApiBase(this.apiServer, gid ? `group?group_id=${gid}` : 'group');
  user: (uid?: string, discord?: boolean) => CrudApiBase = (uid: string, discord: boolean) => new CrudApiBase(this.apiServer, discord ? `user?discord_token=${uid}` : uid ? `user?user_id=${uid}` : 'user');
  userPermissionMapping: (uid: string) => CrudApiBase = (uid: string) => new CrudApiBase(this.apiServer, `user/${uid}/permission/mapping`);

  writeBallot(ballot: Ballot, voteId: string): Promise<Either<string, Ballot>> {
    return EitherUtils.sequence(this.getDiscordId()
      .map(did => this.ballot(voteId)
        .sendCreateRequest(
          BallotJsonSerializer.instance,
          {
            'Discord-Id': did,
            'Access-Control-Allow-Origin': '*'
          },
          {
            ballot: BallotJsonSerializer.instance.toJsonImpl(ballot)
          },
        )));
  }

  writeUser(code: string): Promise<Either<string, User>> {
    return this.user(code, true)
      .sendCreateRequest(UserJsonSerializer.instance, {'Access-Control-Allow-Origin': '*'});
  }

  writeVote(vote: Vote): Promise<Either<string, Vote>> {
    return EitherUtils.sequence(this.getDiscordId()
      .map(did => this.vote
        .sendCreateRequest(
          VoteJsonSerializer.instance,
          {
            'Discord-Id': did,
            'Access-Control-Allow-Origin': '*'
          },
          {
            vote: VoteJsonSerializer.instance.toJsonImpl(vote)
          },
        )));
  }

}
