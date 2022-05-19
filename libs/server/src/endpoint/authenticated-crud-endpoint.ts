import {Request, Response, Router} from "express";
import {User} from "@kashw2/lib-ts";
import {ApiUtils} from "@kashw2/lib-util";
import {AuthenticatedEndpoint} from "./authenticated-endpoint";
import {Future, IO} from "funfix";

export abstract class AuthenticatedCrudEndpoint extends AuthenticatedEndpoint {

  constructor(readonly endpoint: string) {
    super(endpoint);
  }

  /**
   * Provides functionality for Creation of data
   */
  create(req: Request): Future<object> {
    return Future.raise(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`);
  }

  /**
   * Provides functionality for Deletion of data
   */
  delete(req: Request): Future<object> {
    return Future.raise(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`);
  }

  /**
   * Mounts all the methods for Crud to be achievable
   */
  mount(router: Router): void {
    // C - Create
    router.post(this.getEndpoint(), (req: Request, res: Response) => {
      if (this.doesRequireAuthentication(req)) {
        this.getRequestUser(req)
          .fold((error) => ApiUtils.sendError(res, error, 500), (user) => this.runImpl(req, res, user).run());
      } else {
        this.runImpl(req, res, new User()).run();
      }
    });
    // R - Read
    router.get(this.getEndpoint(), (req: Request, res: Response) => {
      if (this.doesRequireAuthentication(req)) {
        this.getRequestUser(req)
          .fold((error) => ApiUtils.sendError(res, error, 500), (user) => this.runImpl(req, res, user).run());
      } else {
        this.runImpl(req, res, new User()).run();
      }
    });
    // U - Update
    router.put(this.getEndpoint(), (req: Request, res: Response) => {
      if (this.doesRequireAuthentication(req)) {
        this.getRequestUser(req)
          .fold((error) => ApiUtils.sendError(res, error, 500), (user) => this.runImpl(req, res, user).run());
      } else {
        this.runImpl(req, res, new User()).run();
      }
    });
    // D - Delete
    router.delete(this.getEndpoint(), (req: Request, res: Response) => {
      if (this.doesRequireAuthentication(req)) {
        this.getRequestUser(req)
          .fold((error) => ApiUtils.sendError(res, error, 500), (user) => this.runImpl(req, res, user).run());
      } else {
        this.runImpl(req, res, new User()).run();
      }
    });
  }

  /**
   * Provides functionality for Reading/Retrieval of data
   */
  read(req: Request): Future<object> {
    return Future.raise(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`);
  }

  runImpl(req: Request, res: Response, user: User): IO<void> {
    if (this.hasPermission(req, res, user)) {
      return IO.of(() => this.getHTTPMethod(req))
        .map(method => {
          switch (method) {
            case 'POST':
              this.create(req)
                .map(res.send)
                .recover((err: string) => ApiUtils.sendError(res, err, 500));
              break;
            case 'GET':
              this.read(req)
                .map(res.send)
                .recover((err: string) => ApiUtils.sendError(res, err, 500));
              break;
            case 'PUT':
              this.update(req)
                .map(res.send)
                .recover((err: string) => ApiUtils.sendError(res, err, 500));
              break;
            case 'DELETE':
              this.delete(req)
                .map(res.send)
                .recover((err: string) => ApiUtils.sendError(res, err, 500));
              break;
            default:
              return ApiUtils.send505(res);
          }
        })
        .recover(error => {
          console.error(error);
          IO.of(() => ApiUtils.send500(res));
        });
    } else {
      console.log(`${this.getRequestUsername(req)} is not authorized to access ${this.getEndpoint()}`);
      return IO.of(() => ApiUtils.send401(res));
    }
  }

  /**
   * Provides functionality for Updating of data
   */
  update(req: Request): Future<object> {
    return Future.raise(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`);
  }

}
