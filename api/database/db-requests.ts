import {List} from "immutable";
import {IRecordSet} from "mssql";
import {JsonSerializer} from "../core/models/json-serializer";
import {unwrapper} from "../core/utils/object-utils";
import {Database} from "./db";

export class DbRequests {

    constructor(readonly db: Database) {

    }

    async runProcedure(
        procedure: string,
        params: List<string>,
    ): Promise<IRecordSet<any>> {
        const connection = await this.db.connection;
        const result = await connection.request()
            .query(`${procedure} ${params.join(",").trim()}`);
        return result.recordset;
    }

    async runRequestSingle(
        procedure: string,
        params: List<string>,
    ): Promise<object> {
        return unwrapper(await this.runProcedure(procedure, params));
    }

    async runSingleSerialised<A, B extends A>(
        procedure: string,
        params: List<string>,
        serialiser: JsonSerializer<A>,
    ): Promise<A> {
        const result = await this.runRequestSingle(procedure, params);
        return serialiser.fromJson(result);
    }

}
