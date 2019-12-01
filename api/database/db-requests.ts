import {List} from "immutable";
import {IRecordSet} from "mssql";
import {JsonSerializer} from "../../core";
import {Database} from "./db";

export class DbRequests {

    constructor(private db: Database) {

    }

    async runList<A>(
        procedure: string,
        params: List<string>,
    ): Promise<List<A>> {
        const result = await this.runProcedure(procedure, params);
        return List(result);
    }

    async runListSerialized<A>(
        procedure: string,
        params: List<string>,
        serializer: JsonSerializer<A>,
    ): Promise<List<A>> {
        const result = await this.runList(procedure, params);
        return result.map(x => serializer.fromJson(x));
    }

    async runProcedure(
        procedure: string,
        params: List<string>,
    ): Promise<IRecordSet<any>> {
        const connection = await this.db.connection;
        const result = await connection.request()
            .query(`${procedure} ${params.join(",").trim()}`);
        return result.recordset[0];
    }

    async runProcedureParsed<A>(
        procedure: string,
        params: List<string>,
        parser: (v: any) => A,
    ): Promise<A> {
        const result = await this.runProcedure(procedure, params);
        return parser(result);
    }

    async runSingle(
        procedure: string,
        params: List<string>,
    ): Promise<object> {
        const result = await this.runProcedure(procedure, params);
        return result;
    }

    async runSingleSerialised<A, B extends A>(
        procedure: string,
        params: List<string>,
        serializer: JsonSerializer<A>,
    ): Promise<A> {
        const result = await this.runSingle(procedure, params);
        return serializer.fromJson(result);
    }

}
