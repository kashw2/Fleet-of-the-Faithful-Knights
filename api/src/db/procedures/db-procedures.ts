import {DbRequest} from "../db-request";
import {DbInsert} from "./db-insert";
import {DbRead} from "./db-read";
import {DbDelete} from "./db-delete";
import {DbUpdate} from "./db-update";

export class DbProcedures {

    constructor(private requests: DbRequest) {
        this.read = new DbRead(requests);
        this.insert = new DbInsert(requests);
        this.delete = new DbDelete(requests);
        this.update = new DbUpdate(requests);
    }

    delete: DbDelete;
    insert: DbInsert;
    read: DbRead;
    update: DbUpdate;

}
