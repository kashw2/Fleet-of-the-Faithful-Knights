import {Request} from "express";

export abstract class RouteManager {

    abstract isAuthorized(): boolean;

}
