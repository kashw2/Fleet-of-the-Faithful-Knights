import {Inject, Injectable} from '@angular/core';
import {CrudApiBase, Group, GroupJsonSerializer, User, UserJsonSerializer, Vote, VoteJsonSerializer} from "@kashw2/lib-ts";
import {Either} from "funfix-core";
import {List} from "immutable";

@Injectable({
  providedIn: 'root'
})
export class FfkApiService {

  constructor(
    @Inject('ffkApiServer') private apiServer: string,
    @Inject('ffkDiscordId') private discordId: string,
  ) {
  }

  permission: CrudApiBase = new CrudApiBase(this.apiServer, 'permission');
  vote: CrudApiBase = new CrudApiBase(this.apiServer, 'vote');

  getDiscordId(): string {
    return this.discordId;
  }

  getGroups(): Promise<Either<string, List<Group>>> {
    return this.group()
      .sendReadRequestList(
        GroupJsonSerializer.instance,
        {},
        {'Discord-Id': this.getDiscordId()}
      );
  }

  getUser(): Promise<Either<string, User>> {
    return this.user(this.getDiscordId())
      .sendReadRequest(
        UserJsonSerializer.instance,
        {},
        {
          'Discord-Id': this.getDiscordId(),
          'Access-Control-Allow-Origin': '*'
        }
      )
  }

  getVotes(): Promise<Either<string, List<Vote>>> {
    return this.vote
      .sendReadRequestList(
        VoteJsonSerializer.instance,
        {},
        {'Discord-Id': this.getDiscordId()}
      );
  }

  group: (gid?: number) => CrudApiBase = (gid?: number) => new CrudApiBase(this.apiServer, gid ? `group?group_id=${gid}` : 'group');
  user: (uid: string) => CrudApiBase = (uid: string) => new CrudApiBase(this.apiServer, uid ? `user?user_id=${uid}` : 'user');
  userPermissionMapping: (uid: string) => CrudApiBase = (uid: string) => new CrudApiBase(this.apiServer, `user/${uid}/permission/mapping`);

}
