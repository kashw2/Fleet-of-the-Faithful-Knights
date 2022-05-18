import {Candidate, Group} from "@kashw2/lib-ts";
import {None, Option, Some} from "funfix-core";
import {DiscordGuildMember} from "@kashw2/lib-external";
import {Map} from "immutable";
import {OptionUtils} from "@kashw2/lib-util";
import {DiscordOnboardingUtils} from "./discord-onboarding-utils";

const discordRoleIdToGroupMap: Map<string, Group> = Map(
  {
    "541835663373369344": new Group(
      Some('0'),
      Some('Sergeant'),
      None,
      Some(0)
    ),
    "811534062920925186": new Group(
      Some('1'),
      Some('Staff Sergeant'),
      None,
      Some(1)
    ),
    "539194544575741993": new Group(
      Some('2'),
      Some('First Sergeant'),
      None,
      Some(2),
    ),
    "811534164469219339": new Group(
      Some('3'),
      Some('Master Sergeant'),
      None,
      Some(3),
    ),
    "541839842435137577": new Group(
      Some('4'),
      Some('Knight'),
      None,
      Some(4),
    ),
    "541834732376424448": new Group(
      Some('5'),
      Some('Knight Lieutenant'),
      None,
      Some(5),
    ),
    "812282595215409193": new Group(
      Some('6'),
      Some('Knight Captain'),
      None,
      Some(6),
    ),
    "812282678103113758": new Group(
      Some('7'),
      Some('Knight Major'),
      None,
      Some(7),
    ),
    "812282753034747925": new Group(
      Some('8'),
      Some('Lieutenant Knight Commander'),
      None,
      Some(8),
    ),
    "539194625056047106": new Group(
      Some('9'),
      Some('Knight Commander'),
      None,
      Some(9),
    ),
    "812282870684844052": new Group(
      Some('10'),
      Some('Lieutenant Master Commander'),
      None,
      Some(10),
    ),
    "541834583268917248": new Group(
      Some('11'),
      Some('Master Commander'),
      None,
      Some(11),
    ),
    "541835139701800962": new Group(
      Some('12'),
      Some('Grand Master'),
      None,
      Some(12),
    ),
    "698756805177901076": new Group(
      Some('13'),
      Some('Developer'),
      None,
      Some(13),
    )
  },
);

export class DiscordOnboardingCandidate extends Candidate {

  constructor(private member: DiscordGuildMember) {
    super();
  }

  getDiscordAvatar(): Option<string> {
    return this.member
      .getUser()
      .flatMap(u => u.getAvatar())
      .map(v => DiscordOnboardingUtils.fixForSql(v));
  }

  getDiscordDiscriminator(): Option<string> {
    return this.member
      .getUser()
      .flatMap(u => u.getDiscriminator());
  }

  getDiscordId(): Option<string> {
    return this.member
      .getUser()
      .flatMap(u => u.getId());
  }

  getDiscordUsername(): Option<string> {
    return this.member
      .getUser()
      .flatMap(u => u.getUsername())
      .orElse(this.member.getNick())
      .map(v => DiscordOnboardingUtils.fixForSql(v));
  }

  getGroup(): Option<Group> {
    return Option.of(OptionUtils.flattenSet(this.member
      .getRoles()
      .map(role => Option.of(discordRoleIdToGroupMap.get(role))))
      .sort((current, previous) => current.isLower(previous) ? 1 : -1)
      .first());
  }

}