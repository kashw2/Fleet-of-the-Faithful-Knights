import {config, ConnectionPool} from "mssql";
import {from, of} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {DbRequest} from "./db-request";
import {DbCache} from "./db-cache";
import {DbProcedures} from "./procedures/db-procedures";

export class Database {

    procedures: DbProcedures;
    cache: DbCache;
    dbConfig: config = {
        user: process.env.FFK_DB_USER,
        password: process.env.FFK_DB_PASSWORD,
        database: process.env.FFK_DB_NAME!,
        server: process.env.FFK_DB_SERVER!,
        parseJSON: true,
    };

    constructor() {
        // Stack / Sequential ordering matters
        this.requests = new DbRequest(this);
        this.procedures = new DbProcedures(this.requests);
        this.cache = new DbCache(this.procedures);
    }

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
            .toPromise();
    }

    private getConnectionPool(): ConnectionPool {
        return new ConnectionPool(this.dbConfig);
    }

}
