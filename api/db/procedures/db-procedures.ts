import {DbRequest} from "../db-request";
import {DbInsert} from "./db-insert";
import {DbRead} from "./db-read";

export class DbProcedures {

    constructor(private requests: DbRequest) {
        this.read = new DbRead(requests);
        this.insert = new DbInsert(requests);
    }
    insert: DbInsert;
    read: DbRead;

}
