import {Either, Left, Right} from "funfix-core";
import {List, Set} from "immutable";
import {ConnectionPool, IRecordSet} from "mssql";
import {EitherUtils, JsonSerializer} from "@kashw2/lib-util";
import {Database} from "./database";
import {Future} from "funfix";

export class DbRequest {

    constructor(private db: Database) {
        this.connection = this.db.getConnection(3)
            .run();
    }

    private connection: Future<ConnectionPool>;

    private getConnection(): Future<ConnectionPool> {
        return this.connection;
    }

    /**
     * getJsonFromRecordSet()
     *
     * Given a Recordset probably returned from a Db query/procedure
     * Return an object that doesn't have to be manipulated to access data correctly
     * Function will probably evolve overtime, this is it in it's bare-bones state
     *
     */
    private getJsonFromRecordSet(rs: IRecordSet<any>): Either<string, IRecordSet<any>> {
        // recordsets always exists whereas recordset only exists if a dataset is returned
        if (!rs || !rs[0] || rs.length < 1) {
            return Left("Database returned empty resultset");
        }
        if (typeof rs[0][''] === "string") {
            return Right(JSON.parse(rs[0]['']));
        }
        return Right(rs[0]);
    }

    sendRequest(
        procedure: string,
        params: List<string>,
    ): Future<Either<string, IRecordSet<any>>> {
        return this.getConnection()
            .map(connection => connection.query(`${procedure} ${params.join(',').trim()}`))
            .flatMap(v => Future.fromPromise(v))
            .map(result => this.getJsonFromRecordSet(result.recordset));
    }

    sendRequestList(
        procedure: string,
        params: List<string>,
    ): Future<Either<string, List<any>>> {
        return this.getConnection()
            .map(connection => connection.query(`${procedure} ${params.join(',').trim()}`))
            .flatMap(v => Future.fromPromise(v))
            .map(result => this.getJsonFromRecordSet(result.recordset))
            .map(v => v.map(List));
    }

    sendRequestListSerialized<A>(
        procedure: string,
        params: List<string>,
        serializer: JsonSerializer<A>,
    ): Future<Either<string, List<A>>> {
        return this.sendRequestList(procedure, params)
            .map(result => result.map(v => serializer.fromJsonArray(v.toArray())));
    }

    sendRequestSerialized<A>(
        procedure: string,
        params: List<string>,
        serializer: JsonSerializer<A>,
    ): Future<Either<string, A>> {
        return this.sendRequest(procedure, params)
            .map(result => result.flatMap(v => EitherUtils.toEither(serializer.fromJsonImpl(v), 'Error serializing response from Database')));
    }

    sendRequestSet<A>(
        procedure: string,
        params: List<string>,
    ): Future<Either<string, Set<any>>> {
        return this.getConnection()
            .map(connection => connection.query(`${procedure} ${params.join(',').trim()}`))
            .flatMap(v => Future.fromPromise(v))
            .map(result => this.getJsonFromRecordSet(result.recordset))
            .map(v => v.map(Set));
    }

}
