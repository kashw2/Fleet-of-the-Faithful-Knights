import {DbRead} from "./db-read";
import {DbRequest} from "../db-request";

export class DbProcedures {

    constructor(private requests: DbRequest) {
        this.read = new DbRead(requests);
    }

    read: DbRead;

}
