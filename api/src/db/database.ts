import {config, ConnectionPool} from "mssql";
import {firstValueFrom, of, switchMap} from "rxjs";
import {map, tap} from "rxjs/operators";
import {DbCache} from "./db-cache";
import {DbRequest} from "./db-request";
import {DbProcedures} from "./procedures/db-procedures";

export class Database {

    constructor() {
        // Stack / Sequential ordering matters
        this.requests = new DbRequest(this);
        this.procedures = new DbProcedures(this.requests);
    }

    // @ts-ignore
    cache: DbCache;

    dbConfig: config = {
        user: process.env.FFK_DATABASE_USERNAME,
        password: process.env.FFK_DATABASE_PASSWORD,
        database: process.env.FFK_DATABASE_NAME,
        server: process.env.FFK_DATABASE_SERVER || 'localhost',
        // @ts-ignore
        port: +process.env.FFK_DATABASE_PORT || 1433,
        connectionTimeout: 300000,
        requestTimeout: 300000,
        options: {
            enableArithAbort: true,
            trustServerCertificate: true,
        },
        parseJSON: true,
    };

    procedures: DbProcedures;

    requests: DbRequest;

    getConnection(): Promise<ConnectionPool> {
        return firstValueFrom(of(this.getConnectionPool())
            .pipe(switchMap(x => x.connect()))
            .pipe(map(x => {
                if (x.connecting) {
                    console.log(`Attempting to connect to ${this.dbConfig.database}`);
                }
                if (x.connected) {
                    console.log(`Connected to ${this.dbConfig.database}`);
                } else {
                    throw new Error(`Error connecting to ${this.dbConfig.database}`);
                }
                return x;
            }))
            .pipe(tap(_ => this.cache = new DbCache(this.procedures)))
        );
    }

    private getConnectionPool(): ConnectionPool {
        return new ConnectionPool(this.dbConfig);
    }

}
