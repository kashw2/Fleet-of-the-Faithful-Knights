import {Request, Response, Router} from "express";
import {ApiUtils} from "@kashw2/lib-util";
import {UnauthenticatedEndpoint} from "./unauthenticated-endpoint";
import {Future} from "funfix";

export abstract class UnauthenticatedCrudEndpoint extends UnauthenticatedEndpoint {

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
    router.post(this.getEndpoint(), this.runImpl);
    // R - Read
    router.get(this.getEndpoint(), this.runImpl);
    // U - Update
    router.put(this.getEndpoint(), this.runImpl);
    // D - Delete
    router.delete(this.getEndpoint(), this.runImpl);
  }

  /**
   * Provides functionality for Reading/Retrieval of data
   */
  read(req: Request): Future<object> {
    return Future.raise(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`);
  }

  runImpl(req: Request, res: Response): void {
    try {
      switch (this.getHTTPMethod(req)) {
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
    } catch (error) {
      console.error(error);
      return ApiUtils.send500(res);
    }
  }

  /**
   * Provides functionality for Updating of data
   */
  update(req: Request): Future<object> {
    return Future.raise(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`);
  }

}