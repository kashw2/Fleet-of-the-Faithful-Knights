import {Database} from "../database";
import {DbRead} from "./db-read";

export class DbProcedures {

    constructor(private db: Database) {
        // TODO: Pass in DbProcedures instead of entire Db
        this.read = new DbRead(db);
    }

    read: DbRead;

}
