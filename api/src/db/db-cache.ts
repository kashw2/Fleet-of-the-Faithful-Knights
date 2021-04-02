import {DbProcedures} from "./procedures/db-procedures";

export class DbCache {

    constructor(private procedures: DbProcedures) {

    }

    ready: boolean = true;

}
