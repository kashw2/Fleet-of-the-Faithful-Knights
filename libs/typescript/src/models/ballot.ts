import {JsonBuilder, JsonSerializer, MomentUtils, parseDate, parseNumber, parseString} from '@kashw2/lib-util';
import {None, Option, Some} from 'funfix-core';
import {User, UserJsonSerializer} from './user';
import * as moment from 'moment';
import {createdKey, descriptionKey, idKey, modifiedKey, responseKey, voterKey} from '../misc/json-keys';

export class Ballot {

  constructor(
    private id: Option<string> = None,
    private voter: Option<User> = None,
    private description: Option<string> = None,
    private response: Option<number> = None,
    private created: Option<moment.Moment> = None,
    private modified: Option<moment.Moment> = None,
  ) {
  }

  public getCreated(): Option<moment.Moment> {
    return this.created;
  }

  public getCreatedFormatted(format: 'DMY'): Option<string> {
    return MomentUtils.format(this.getCreated(), format);
  }

  public getDescription(): Option<string> {
    return this.description;
  }

  public getFormattedVoterDiscordAvatar(): Option<string> {
    return Option.map2(
      this.getVoterDiscordId(),
      this.getVoterDiscordAvatar(),
      (did, avatar) => `https://cdn.discordapp.com/avatars/${did}/${avatar}.png`,
    );
  }

  public getId(): Option<string> {
    return this.id;
  }

  public getModified(): Option<moment.Moment> {
    return this.modified;
  }

  public getModifiedFormatted(format: 'DMY'): Option<string> {
    return MomentUtils.format(this.getModified(), format);
  }

  public getPreparedResponse(): Option<string> {
    if (this.getResponse().contains(0)) {
      return Some('Affirm');
    }
    if (this.getResponse().contains(1)) {
      return Some('Deny');
    }
    if (this.getResponse().contains(2)) {
      return Some('Veto');
    }
    return None;
  }

  public getResponse(): Option<number> {
    return this.response;
  }

  public getVoter(): Option<User> {
    return this.voter;
  }

  public getVoterDiscordAvatar(): Option<string> {
    return this.getVoter()
      .flatMap(v => v.getDiscordAvatar());
  }

  public getVoterDiscordId(): Option<string> {
    return this.getVoter()
      .flatMap(v => v.getDiscordId());
  }

  public getVoterId(): Option<string> {
    return this.getVoter()
      .flatMap(v => v.getId());
  }

  public getVoterUsername(): Option<string> {
    return this.getVoter()
      .flatMap(v => v.getUsername());
  }

}

export class BallotJsonSerializer extends JsonSerializer<Ballot> {

  static instance: BallotJsonSerializer = new BallotJsonSerializer();

  fromJson(json: any): Ballot {
    return new Ballot(
      parseString(json[idKey]),
      UserJsonSerializer.instance.fromJsonImpl(json[voterKey]),
      parseString(json[descriptionKey]),
      parseNumber(json[responseKey]),
      parseDate(json[createdKey]),
      parseDate(json[modifiedKey]),
    );
  }

  toJson(value: Ballot, builder: JsonBuilder): Record<string, any> {
    return builder.addOptional(value.getId(), idKey)
      .addOptionalSerialized(value.getVoter(), voterKey, UserJsonSerializer.instance)
      .addOptional(value.getDescription(), descriptionKey)
      .addOptional(value.getResponse(), responseKey)
      .addOptional(value.getCreated(), createdKey)
      .addOptional(value.getModified(), modifiedKey)
      .build();
  }

}
