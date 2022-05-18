import {ApiEndpoint} from "./api-endpoint";
import {Request, Response} from "express";

export abstract class UnauthenticatedEndpoint extends ApiEndpoint {

  constructor(readonly endpoint: string) {
    super(endpoint);
  }

  abstract runImpl(req: Request, res: Response): void;

}