import {List} from "immutable";
import {IRecordSet} from "mssql";
import {Database} from "./db";
import {JsonSerializer} from "./models/json-serializer";
import {UserJsonSerializer} from "./models/user";
import {unwrapper} from "./utils/object-utils";

export class DbRequests {

    constructor(readonly db: Database) {
        this.r();
    }

    async r() {
        const c = await this.runSingleSerialised(
            "ssp_json_GetUser",
            List.of("@Username = 'Keanu'", "@Password = '09ea7be9b22606b0c4abffd59ec5eb58abcad3536f33d734effafc74c38ae1e9'"),
            UserJsonSerializer.instance,
        );
        console.log(c);
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
