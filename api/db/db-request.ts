import {Database} from "./database";
import {ConnectionPool, IRecordSet} from "mssql";
import {List} from 'immutable';
import {Either, Left} from "funfix-core";
import {getJsonFromRecordSet} from "../../core/src/util/object-utils";

export class DbRequest {

    connection: Promise<ConnectionPool>;

    constructor(private db: Database) {
        this.connection = this.db.getConnection();
    }

    async sendRequest(procedure: string, params: List<string>): Promise<Either<string, IRecordSet<any>>> {
        const connection = await this.connection;
        const result = await connection.request()
            .query(`${procedure} ${params.join(',').trim()}`);
        // recordsets always exists whereas recordset only exists if a dataset is returned
        if (result.recordsets.length < 1) {
            return Left('No data');
        }
        return getJsonFromRecordSet(result.recordset);
    }

}

