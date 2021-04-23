import {config, ConnectionPool} from "mssql";
import {from, of} from "rxjs";
import {flatMap, map, tap} from "rxjs/operators";
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
        connectionTimeout: 300000,
        requestTimeout: 300000,
        options: {
            enableArithAbort: true,
        },
        parseJSON: true,
    };

    procedures: DbProcedures;

    requests: DbRequest;

    getConnection(): Promise<ConnectionPool> {
        return of(this.getConnectionPool())
            .pipe(flatMap(x => from(x.connect())))
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
            .toPromise();
    }

    private getConnectionPool(): ConnectionPool {
        return new ConnectionPool(this.dbConfig);
    }

}
