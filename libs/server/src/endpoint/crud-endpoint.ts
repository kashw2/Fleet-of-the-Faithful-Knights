import {ApiEndpoint} from "./api-endpoint";
import {Request, Response, Router} from "express";
import {User} from "@kashw2/lib-ts";
import {ApiUtils} from "@kashw2/lib-util";
import {Either, Left} from "funfix-core";

export abstract class CrudEndpoint extends ApiEndpoint {

    constructor(readonly endpoint: string) {
        super(endpoint);
    }

    create(req: Request): Either<string, any> {
        return Left(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`);
    }

    delete(req: Request): Either<string, any> {
        return Left(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`);
    }

    mount(router: Router): void {
        router.post(this.getEndpoint(), (req: Request, res: Response) => {
            this.getRequestUser(req)
                .fold((error) => ApiUtils.sendError(res, error), (user) => this.runImpl(req, res, user))
        });
        router.get(this.getEndpoint(), (req: Request, res: Response) => {
            this.getRequestUser(req)
                .fold((error) => ApiUtils.sendError(res, error), (user) => this.runImpl(req, res, user))
        });
        router.put(this.getEndpoint(), (req: Request, res: Response) => {
            this.getRequestUser(req)
                .fold((error) => ApiUtils.sendError(res, error), (user) => this.runImpl(req, res, user))
        });
        router.delete(this.getEndpoint(), (req: Request, res: Response) => {
            this.getRequestUser(req)
                .fold((error) => ApiUtils.sendError(res, error), (user) => this.runImpl(req, res, user))
        });
    }

    read(req: Request): Either<string, any> {
        return Left(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`);
    }

    runImpl(req: Request, res: Response, user: User): void {
        if (this.hasPermission(req, res, user)) {
            try {
                switch (this.getHTTPMethod(req)) {
                    case 'POST':
                        this.create(req)
                            .fold((error) => ApiUtils.sendError(res, error), (v) => res.send(v));
                        break;
                    case 'GET':
                        this.read(req)
                            .fold((error) => ApiUtils.sendError(res, error), (v) => res.send(v));
                        break;
                    case 'PUT':
                        this.update(req)
                            .fold((error) => ApiUtils.sendError(res, error), (v) => res.send(v));
                        break;
                    case 'DELETE':
                        this.delete(req)
                            .fold((error) => ApiUtils.sendError(res, error), (v) => res.send(v));
                        break;
                    default:
                        return ApiUtils.send505(res);
                }
            } catch (error) {
                return ApiUtils.send500(res);
            }
        } else {
            return ApiUtils.send401(res);
        }
    }

    update(req: Request): Either<string, any> {
        return Left(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`);
    }

}
