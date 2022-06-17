import {AuthenticatedCrudEndpoint} from "@kashw2/lib-server";
import {Group, User, UserJsonSerializer} from "@kashw2/lib-ts";
import {Request, Response} from "express";
import {ApiUtils, EitherUtils, FutureUtils, OptionUtils} from "@kashw2/lib-util";
import {Either, None, Option, Some} from "funfix-core";
import {Database} from "../db/database";
import {DiscordApi} from "@kashw2/lib-external";
import {filter, map, switchMap, tap} from "rxjs/operators";
import {List, Map} from "immutable";
import {from, lastValueFrom, of} from "rxjs";
import {Future} from "funfix";

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

export class UserEndpoint extends AuthenticatedCrudEndpoint {

  constructor(private db: Database) {
    super('/user');
  }

  create(req: Request): Future<object> {
    if (this.getDiscordAuthToken(req).isRight()) {
      const discordApi: DiscordApi = new DiscordApi(
        '607005043043860521',
        process.env.FFK_DISCORD_CLIENT_SECRET!,
        process.env.FFK_DISCORD_REDIRECT!,
        process.env.FFK_DISCORD_BOT_TOKEN!,
      );
      return Future.fromPromise(lastValueFrom(from(discordApi.getOAuth(this.getDiscordAuthToken(req).get()))
        .pipe(map(v => v.toOption().flatMap(dt => dt.getAccessToken())))
        .pipe(filter(v => v.nonEmpty()))
        .pipe(map(v => v.get()))
        .pipe(switchMap(token => {
          return from(discordApi.getCurrentUser(token))
            .pipe(switchMap(du => {
              return of(du)
                .pipe(map(v => v.toOption().flatMap(du2 => du2.getId())))
                .pipe(filter(v => v.nonEmpty()))
                .pipe(map(v => v.get()))
                .pipe(switchMap(did => discordApi.getGuildMember(did, DiscordApi.getFfkGuildId())))
                .pipe(map(v => v.toOption().map(dgm => dgm.getRoles()).getOrElse(List<string>())))
                .pipe(map(roles => roles.map(r => Option.of(discordRoleIdToGroupMap.get(r)))))
                .pipe(map(v => v.filterNot(gs => gs.isEmpty())))
                .pipe(map((groups) => OptionUtils.flattenList(groups.toList())))
                .pipe(map(groups => groups.sort((current, previous) => current.isLower(previous) ? 1 : -1).first<Group>()))
                .pipe(map(group => User.fromDiscordUser(du.get()).withGroup(group)))
                .pipe(tap(u => {
                  this.db.cache.updateUsers(this.db.cache.users.add(u));
                  this.db.procedures.insert.insertUser(u)('System');
                }));
            }));
        })))
      )
        .map(u => EitherUtils.liftEither(UserJsonSerializer.instance.toJsonImpl(u), "Unable to create User"))
        .flatMap(FutureUtils.fromEither);
    }
    return EitherUtils.sequenceFuture(this.validate(req)
      .map(u => {
        this.db.cache.updateUsers(this.db.cache.users.add(u));
        return this.db.procedures.insert.insertUser(u)(this.getModifiedBy(req));
      }))
      .flatMap(FutureUtils.fromEither)
      .map(v => UserJsonSerializer.instance.toJsonImpl(v));
  }


  delete(req: Request): Future<object> {
    if (this.getDiscordAuthToken(req).isRight()) {
      EitherUtils.sequenceFuture(this.getDiscordAuthToken(req)
        .map(t => this.db.procedures.delete.deleteUser(t)))
        .flatMap(FutureUtils.fromEither)
        .map(v => {
          this.db.cache.updateUsers(this.db.cache.users.removeIn(ru => ru.getDiscordId().equals(v.getDiscordId())));
          return UserJsonSerializer.instance.toJsonImpl(v);
        });
    }
    return EitherUtils.sequenceFuture(this.getUserId(req)
      .map(uid => {
        this.db.cache.users.removeIn(u => u.getId().contains(uid));
        return this.db.procedures.delete.deleteUser(uid);
      }))
      .flatMap(FutureUtils.fromEither)
      .map(v => {
        return UserJsonSerializer.instance.toJsonImpl(v);
      });
  }

  doesRequireAuthentication(req: Request): boolean {
    switch (this.getHTTPMethod(req)) {
      case 'POST':
        return false;
      case 'GET':
        return true;
      case 'PUT':
        return true;
      case 'DELETE':
        return true;
      default:
        return true;
    }
  }

  getDiscordAuthToken(req: Request): Either<string, string> {
    return ApiUtils.parseStringQueryParam(req, 'discord_token');
  }

  private getUser(req: Request): Either<string, User> {
    return ApiUtils.parseBodyParamSerialized(req, 'user', UserJsonSerializer.instance);
  }

  private getUserId(req: Request): Either<string, string> {
    return ApiUtils.parseStringQueryParam(req, 'user_id');
  }

  hasPermission(req: Request, res: Response, user: User): boolean {
    switch (this.getHTTPMethod(req)) {
      case 'POST':
        return true;
      case 'GET':
        // Check to see if user is listing all users
        if (this.getUserId(req).isLeft() && !this.shouldReadCurrentUser(req)) {
          // TODO: Remove need for the discordRoleIdToGroupMap
          return OptionUtils.exists2(
            user.getGroup(),
            Option.of(discordRoleIdToGroupMap.get('541839842435137577')),
            (uG, dG) => uG.isHigherOrEqual(dG),
          );
        }
        return true;
      case 'PUT':
        return true;
      case 'DELETE':
        return true;
      default:
        return false;
    }
  }

  read(req: Request): Future<object> {
    if (this.shouldReadCurrentUser(req)) {
      return Future.pure(() => req.user);
    }
    if (this.getUserId(req).isLeft()) {
      return FutureUtils.fromEither(EitherUtils.liftEither(UserJsonSerializer.instance.toJsonArray(this.db.cache.users.getUsers().toArray()), "Users cache is empty"));
    }
    return FutureUtils.fromEither(this.getUserId(req)
      .map(uid => this.db.cache.users.getByDiscordId(uid)))
      .flatMap(FutureUtils.fromEither)
      .map(v => UserJsonSerializer.instance.toJsonImpl(v));
  }

  private shouldReadCurrentUser(req: Request): boolean {
    return ApiUtils.parseBooleanQueryParam(req, 'current_user')
      .getOrElse(false);
  }

  update(req: Request): Future<object> {
    return EitherUtils.sequenceFuture(this.validate(req)
      .map(u => {
        this.db.cache.updateUsers(this.db.cache.users.add(u));
        return this.db.procedures.update.updateUser(u)(this.getRequestUsername(req));
      }))
      .flatMap(FutureUtils.fromEither)
      .map(v => UserJsonSerializer.instance.toJsonImpl(v));
  }

  private validate(req: Request): Either<string, User> {
    switch (this.getHTTPMethod(req)) {
      case 'POST':
        if (!this.doesRequireAuthentication(req)) {
          return Right(new User());
        }
        // In hindsight, we will probably never be creating a user where we know the user that is coming in externally
        return this.getUser(req);
      case 'PUT':
        return this.getUser(req)
          .filterOrElse(u => u.getId().nonEmpty(), () => 'User must have an Id');
      default:
        return this.getUser(req);
    }
  }

}
