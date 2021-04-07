import {ApiEndpoint} from "./api-endpoint";
import {Request, Response, Router} from "express";
import {User} from "@kashw2/lib-ts";
import {ApiUtils} from "@kashw2/lib-util";
import {Either, Left} from "funfix-core";

export abstract class CrudEndpoint extends ApiEndpoint {

    constructor(readonly endpoint: string) {
        super(endpoint);
    }

   async create(req: Request): Promise<Either<string, any>> {
        return Promise.resolve(Left(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`));
    }

   async delete(req: Request): Promise<Either<string, any>> {
        return Promise.resolve(Left(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`));
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

   async read(req: Request): Promise<Either<string, any>> {
        return Promise.resolve(Left(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`));
    }

    runImpl(req: Request, res: Response, user: User): void {
        if (this.hasPermission(req, res, user)) {
            try {
                switch (this.getHTTPMethod(req)) {
                    case 'POST':
                        this.create(req)
                            .then(x => x.fold((error) => ApiUtils.sendError(res, error), (v) => res.send(v)));
                        break;
                    case 'GET':
                        this.read(req)
                            .then(x => x.fold((error) => ApiUtils.sendError(res, error), (v) => res.send(v)));
                        break;
                    case 'PUT':
                        this.update(req)
                            .then(x => x.fold((error) => ApiUtils.sendError(res, error), (v) => res.send(v)));
                        break;
                    case 'DELETE':
                        this.delete(req)
                            .then(x => x.fold((error) => ApiUtils.sendError(res, error), (v) => res.send(v)));
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

   async update(req: Request): Promise<Either<string, any>> {
        return Promise.resolve(Left(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`));
    }

}
