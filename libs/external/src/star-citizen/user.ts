import {JsonBuilder, JsonSerializer, parseDate, parseSetSerialized, parseString} from '@kashw2/lib-util';
import {None, Option} from 'funfix-core';
import * as moment from 'moment';
import {Set} from 'immutable';
import {StarCitizenOrganisation, StarCitizenOrganisationJsonSerializer} from './organisation';
import {bioKey, communityMonikerKey, enlistedKey, handleKey, idKey, languageKey, locationKey, organisationsKey, usernameKey, websiteKey} from './json-keys';

export class StarCitizenUser {

  constructor(
    private id: Option<string> = None,
    private username: Option<string> = None,
    private handle: Option<string> = None,
    private communityMoniker: Option<string> = None,
    private enlisted: Option<moment.Moment> = None,
    private location: Option<string> = None,
    private language: Option<string> = None,
    private website: Option<string> = None,
    private bio: Option<string> = None,
    private organisations: Set<StarCitizenOrganisation> = Set(),
  ) {
  }

  public getBio(): Option<string> {
    return this.bio;
  }

  public getCommunityMoniker(): Option<string> {
    return this.communityMoniker;
  }

  public getEnlisted(): Option<moment.Moment> {
    return this.enlisted;
  }

  public getHandle(): Option<string> {
    return this.handle;
  }

  public getId(): Option<string> {
    return this.id;
  }

  public getLanguage(): Option<string> {
    return this.language;
  }

  public getLocation(): Option<string> {
    return this.location;
  }

  public getOrganisations(): Set<StarCitizenOrganisation> {
    return this.organisations;
  }

  public getUsername(): Option<string> {
    return this.username
      .orElse(this.getCommunityMoniker())
      .orElse(this.getHandle());
  }

  public getWebsite(): Option<string> {
    return this.website;
  }

}

export class StarCitizenUserJsonSerializer extends JsonSerializer<StarCitizenUser> {

  static instance: StarCitizenUserJsonSerializer = new StarCitizenUserJsonSerializer();

  fromJson(json: any): StarCitizenUser {
    return new StarCitizenUser(
      parseString(json[idKey]),
      parseString(json[usernameKey]),
      parseString(json[handleKey]),
      parseString(json[communityMonikerKey]),
      parseDate(json[enlistedKey]),
      parseString(json[locationKey]),
      parseString(json[languageKey]),
      parseString(json[websiteKey]),
      parseString(json[bioKey]),
      parseSetSerialized(json[organisationsKey], StarCitizenOrganisationJsonSerializer.instance),
    );
  }

  toJson(value: StarCitizenUser, builder: JsonBuilder): Record<string, any> {
    return builder.addOptional(value.getId(), idKey)
      .addOptional(value.getUsername(), usernameKey)
      .addOptional(value.getHandle(), handleKey)
      .addOptional(value.getCommunityMoniker(), communityMonikerKey)
      .addOptional(value.getEnlisted(), enlistedKey)
      .addOptional(value.getLocation(), locationKey)
      .addOptional(value.getLanguage(), languageKey)
      .addOptional(value.getWebsite(), websiteKey)
      .addOptional(value.getBio(), bioKey)
      .addIterableSerialized(value.getOrganisations(), organisationsKey, StarCitizenOrganisationJsonSerializer.instance)
      .build();
  }

}
