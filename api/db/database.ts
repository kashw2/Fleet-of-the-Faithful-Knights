import {config, ConnectionPool} from "mssql";
import {from, Observable, of} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {DbRequest} from "./db-request";

export class Database {

    dbConfig: config = {
        user: process.env.FFK_DB_USER!,
        password: process.env.FFK_DB_PASSWORD!,
        database: process.env.FFK_DB_NAME!,
        server: process.env.FFK_DB_SERVER!,
        parseJSON: true,
    };
    requests: DbRequest;

    constructor() {
        this.requests = new DbRequest(this);
    }

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
