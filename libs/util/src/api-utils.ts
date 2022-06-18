import {Request, Response} from "express";
import {Either} from "funfix-core";
import {EitherUtils} from "./either-utils";
import {JsonSerializer} from "./json-serializer";
import {List} from "immutable";

export class ApiUtils {

  static parseBodyParamSerialized<A>(req: Request, key: string, serializer: JsonSerializer<A>): Either<string, A> {
    return EitherUtils.toEither(serializer.fromJsonImpl(req.body[key]), `Unable to parse body param ${key}`);
  }

  static parseBodyParamSerializedList<A>(req: Request, key: string, serializer: JsonSerializer<A>): Either<string, List<A>> {
    return EitherUtils.lift(serializer.fromJsonArray(req.body[key]), `Unable to parse body param ${key}`);
  }

  static parseBooleanQueryParam(req: Request, key: string): Either<string, boolean> {
    return EitherUtils.lift(req.query[key] as string, `Unable to parse query param ${key}`)
      .map(v => v.toLowerCase() === 'true');
  }

  static parseStringHeaderParam(req: Request, key: string): Either<string, string> {
    return EitherUtils.lift(req.rawHeaders[key], `Unable to parse header ${key}`);
  }

  static parseStringQueryParam(req: Request, key: string): Either<string, string> {
    return EitherUtils.lift(req.query[key] as string, `Unable to parse query param ${key}`);
  }

  static parseUrlStringParam(req: Request, key: string): Either<string, string> {
    return EitherUtils.lift(req.params[key], `Unable to parse url param ${key}`);
  }

  static send401(res: Response): void {
    res.sendStatus(401);
  }

  static send500(res: Response): void {
    res.sendStatus(500);
  }

  static send505(res: Response): void {
    res.sendStatus(505);
  }

  static sendError(res: Response, error: string, code: number): void {
    res.status(code)
      .json({error});
  }

  static sendSerializedListResponse<A>(res: Response, data: A[], serializer: JsonSerializer<A>): void {
    res.send(serializer.toJsonArray(data));
  }

  static sendSerializedResponse<A>(res: Response, data: A, serializer: JsonSerializer<A>): void {
    res.send(serializer.toJsonImpl(data));
  }

}
