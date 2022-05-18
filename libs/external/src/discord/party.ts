import {None, Option} from 'funfix-core';
import {List} from 'immutable';
import {JsonBuilder, JsonSerializer, parseList, parseString} from '@kashw2/lib-util';
import {idKey, sizeKey} from './json-keys';

export class DiscordParty {

  constructor(
    readonly id: Option<string> = None,
    readonly size: List<number> = List(),
  ) {
  }

  public getId(): Option<string> {
    return this.id;
  }

  public getSize(): List<number> {
    return this.size;
  }

}

export class DiscordPartyJsonSerializer extends JsonSerializer<DiscordParty> {

  static instance: DiscordPartyJsonSerializer = new DiscordPartyJsonSerializer();

  fromJson(json: any): DiscordParty {
    return new DiscordParty(
      parseString(json[idKey]),
      parseList(json[sizeKey]),
    );
  }

  toJson(value: DiscordParty, builder: JsonBuilder): Record<string, any> {
    return builder.addOptional(value.getId(), idKey)
      .addIterable(value.getSize(), sizeKey)
      .build();
  }

}
