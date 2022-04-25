import {Either, Left, Option, Right} from "funfix-core";
import {List, Set} from "immutable";
import {ConnectionPool, IRecordSet} from "mssql";
import {EitherUtils, JsonSerializer} from "@kashw2/lib-util";
import {Database} from "./database";

export class DbRequest {

    constructor(private db: Database) {
        this.connection = this.db.getConnection();
    }

    private connection: Promise<ConnectionPool>;


    /**
     * getJsonFromRecordSet()
     *
     * Given a Recordset probably returned from a Db query/procedure
     * Return an object that doesn't have to be manipulated to access data correctly
     * Function will probably evolve overtime, this is it in it's bare-bones state
     *
     */
    private getJsonFromRecordSet(rs: any): Either<string, IRecordSet<any>> {
        if (!rs || rs === "{}" || rs === []) {
            return Left("Database returned empty resultset");
        }
        if (typeof rs[0][''] === "string") {
            return Right(JSON.parse(rs[0]['']));
        }
        return Right(rs[0]);
    }

    async sendRequest(
        procedure: string,
        params: List<string>,
    ): Promise<Either<string, IRecordSet<any>>> {
        const connection = await this.connection;
        console.debug(`EXEC ${procedure} ${params.join(",").trim()}`);
        const result = await connection.request()
            .query(`${procedure} ${params.join(",").trim()}`);
        // recordsets always exists whereas recordset only exists if a dataset is returned
        if (result.recordsets.length < 1 || Option.of(result.recordset[0]).isEmpty()) {
            console.error(`Error running: ${procedure} ${params.join(",").trim()}`);
            return Left(`Error running: ${procedure} ${params.join(",").trim()}`);
        }
        return this.getJsonFromRecordSet(result.recordset);
    }

    async sendRequestList(
        procedure: string,
        params: List<string>,
    ): Promise<Either<string, List<any>>> {
        const connection = await this.connection;
        const result = await connection.request()
            .query(`${procedure} ${params.join(", ").trim()}`);
        if (Option.of(result.recordset[0]).isEmpty()) {
            return Right(List());
        }
        return this.getJsonFromRecordSet(result.recordset)
            .map((x: IRecordSet<any>) => List(x));
    }

    async sendRequestListSerialized<A>(
        procedure: string,
        params: List<string>,
        serializer: JsonSerializer<A>,
    ): Promise<Either<string, List<A>>> {
        const result = await this.sendRequestList(procedure, params);
        if (result.isLeft()) {
            return Left(result.value);
        }
        return result.map(x => serializer.fromJsonArray(x.toArray()));
    }

    async sendRequestSerialized<A>(
        procedure: string,
        params: List<string>,
        serializer: JsonSerializer<A>,
    ): Promise<Either<string, A>> {
        const response = await this.sendRequest(procedure, params);
        return response.flatMap(x => EitherUtils.toEither(serializer.fromJsonImpl(x), 'Error serializing response from Database'));
    }

    async sendRequestSet<A>(
        procedure: string,
        params: List<string>,
    ): Promise<Either<string, Set<any>>> {
        const connection = await this.connection;
        const result = await connection.request()
            .query(`${procedure} ${params.join(", ").trim()}`);
        if (result.recordsets.length < 1 || Option.of(result.recordset[0]).isEmpty()) {
            console.error(`Error running: ${procedure} ${params.join(",").trim()}`);
            return Right(Set());
        }
        return this.getJsonFromRecordSet(result.recordset)
            .map((x: IRecordSet<any>) => Set(x));
    }

}
