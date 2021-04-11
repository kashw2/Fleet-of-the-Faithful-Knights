import {DbRequest} from "../db-request";
import {DbInsert} from "./db-insert";
import {DbRead} from "./db-read";
import {DbDelete} from "./db-delete";

export class DbProcedures {

    constructor(private requests: DbRequest) {
        this.read = new DbRead(requests);
        this.insert = new DbInsert(requests);
        this.delete = new DbDelete(requests);
    }
    delete: DbDelete;
    insert: DbInsert;
    read: DbRead;

}
