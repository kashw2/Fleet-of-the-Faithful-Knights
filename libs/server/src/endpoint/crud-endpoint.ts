import {ApiEndpoint} from "./api-endpoint";
import {Request, Response, Router} from "express";
import {User} from "@kashw2/lib-ts";
import {ApiUtils} from "@kashw2/lib-util";
import {Either, Left} from "funfix-core";

export abstract class CrudEndpoint extends ApiEndpoint {

    constructor(readonly endpoint: string) {
        super(endpoint);
    }

    /**
     * Provides functionality for Creation of data
     */
    async create(req: Request): Promise<Either<string, any>> {
        return Promise.resolve(Left(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`));
    }

    /**
     * Provides functionality for Deletion of data
     */
    async delete(req: Request): Promise<Either<string, any>> {
        return Promise.resolve(Left(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`));
    }

    /**
     * Mounts all the methods for Crud to be achievable
     */
    mount(router: Router): void {
        // C - Create
        router.post(this.getEndpoint(), (req: Request, res: Response) => {
            this.getRequestUser(req)
                .fold((error) => ApiUtils.sendError(res, error), (user) => this.runImpl(req, res, user))
        });
        // R - Read
        router.get(this.getEndpoint(), (req: Request, res: Response) => {
            this.getRequestUser(req)
                .fold((error) => ApiUtils.sendError(res, error), (user) => this.runImpl(req, res, user))
        });
        // U - Update
        router.put(this.getEndpoint(), (req: Request, res: Response) => {
            this.getRequestUser(req)
                .fold((error) => ApiUtils.sendError(res, error), (user) => this.runImpl(req, res, user))
        });
        // D - Delete
        router.delete(this.getEndpoint(), (req: Request, res: Response) => {
            this.getRequestUser(req)
                .fold((error) => ApiUtils.sendError(res, error), (user) => this.runImpl(req, res, user))
        });
    }

    /**
     * Provides functionality for Reading/Retrieval of data
     */
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
                console.error(error);
                return ApiUtils.send500(res);
            }
        } else {
            console.log(`${this.getRequestUsername(req)} is not authorized to access ${this.getEndpoint()}`);
            return ApiUtils.send401(res);
        }
    }

    /**
     * Provides functionality for Updating of data
     */
    async update(req: Request): Promise<Either<string, any>> {
        return Promise.resolve(Left(`${this.getHTTPMethod(req)} Not Implemented for ${this.getEndpoint()}`));
    }

}
