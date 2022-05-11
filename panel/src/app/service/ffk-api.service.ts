import {Inject, Injectable} from '@angular/core';
import {Ballot, BallotJsonSerializer, Candidate, CandidateJsonSerializer, Group, GroupJsonSerializer, User, UserJsonSerializer, Vote, VoteJsonSerializer} from "@kashw2/lib-ts";
import {Either, Left} from "funfix-core";
import {List} from "immutable";
import {CrudLocalStorageService} from "./crud.service";
import {CrudApiBase, EitherUtils} from "@kashw2/lib-util";
import {Future} from "funfix";


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

  deleteUser(): Future<Either<any, User>> {
    return this.getDiscordId()
      .map(did => this.user(did, true)
        .sendDeleteRequest(
          UserJsonSerializer.instance,
          {
            'Discord-Id': did,
            'Access-Control-Allow-Origin': '*'
          },
          {},
        ))
      .getOrElse(Future.pure(Left('Unable to delete User')));
  }

  getBallots(): Future<List<Ballot>> {
    return this.getDiscordId()
      .map(did => this.ballot()
        .sendReadRequestList(
          BallotJsonSerializer.instance,
          {
            'Discord-Id': did,
            'Access-Control-Allow-Origin': '*'
          },
          {},
        )).getOrElse(Future.pure(List<Ballot>()));
  }

  getCandidates(): Future<List<Candidate>> {
    return this.getDiscordId()
      .map(did => this.candidate
        .sendReadRequestList(
          CandidateJsonSerializer.instance,
          {
            'Discord-Id': did,
            'Access-Control-Allow-Origin': '*'
          },
          {},
        )).getOrElse(Future.pure(List<Candidate>()));
  }

  getDiscordId(): Either<string, string> {
    return EitherUtils.toEither(this.crudLocalStorageService.read('discordid'), "Client -> Server Handshake Failed");
  }

  getGroups(): Future<List<Group>> {
    return this.getDiscordId()
      .map(did => {
        return this.group()
          .sendReadRequestList(
            GroupJsonSerializer.instance,
            {
              'Discord-Id': did,
              'Access-Control-Allow-Origin': '*'
            },
            {},
          );
      }).getOrElse(Future.pure(List<Group>()));
  }

  getUser(): Future<Either<string, User>> {
    return this.getDiscordId()
      .map(did => this.user(did).sendReadRequest(
        UserJsonSerializer.instance,
        {
          'Discord-Id': did,
          'Access-Control-Allow-Origin': '*'
        },
        {},
      )).getOrElse(Future.pure(Left('Unable to return User')));
  }

  getUsers(): Future<List<User>> {
    return this.getDiscordId()
      .map(did => this.user().sendReadRequestList(
        UserJsonSerializer.instance,
        {
          'Discord-Id': did,
          'Access-Control-Allow-Origin': '*'
        },
        {},
      )).getOrElse(Future.pure(List<User>()));
  }

  getVotes(): Future<List<Vote>> {
    return this.getDiscordId()
      .map(did => this.vote
        .sendReadRequestList(
          VoteJsonSerializer.instance,
          {
            'Discord-Id': did,
            'Access-Control-Allow-Origin': '*'
          },
          {},
        )).getOrElse(Future.pure(List<Vote>()));
  }

  group: (gid?: number) => CrudApiBase = (gid?: number) => new CrudApiBase(this.apiServer, gid ? `group?group_id=${gid}` : 'group');
  user: (uid?: string, discord?: boolean) => CrudApiBase = (uid: string, discord: boolean) => new CrudApiBase(this.apiServer, discord ? `user?discord_token=${uid}` : uid ? `user?user_id=${uid}` : 'user');
  userPermissionMapping: (uid: string) => CrudApiBase = (uid: string) => new CrudApiBase(this.apiServer, `user/${uid}/permission/mapping`);

  writeBallot(ballot: Ballot, voteId: string): Future<Either<string, Ballot>> {
    return this.getDiscordId()
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
        )).getOrElse(Future.pure(Left('Unable to write Ballot')));
  }

  writeUser(code: string): Future<Either<string, User>> {
    return this.user(code, true)
      .sendCreateRequest(UserJsonSerializer.instance, {'Access-Control-Allow-Origin': '*'});
  }

  writeVote(vote: Vote): Future<Either<string, Vote>> {
    return this.getDiscordId()
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
        )).getOrElse(Future.pure(Left('Unable to write Vote')));
  }

}
