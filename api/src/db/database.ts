import {config, ConnectionPool} from "mssql";
import {DbCache} from "./db-cache";
import {DbRequest} from "./db-request";
import {DbProcedures} from "./procedures/db-procedures";
import {Future, IO} from "funfix";

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

    getConnection(attempts: number): IO<ConnectionPool> {
        return IO.of(() => this.getConnectionPool())
            .flatMap(pool => IO.fromFuture(Future.fromPromise(pool.connect())))
            .map(pool => {
                if (pool.connected) {
                    console.log(`Connected to ${this.dbConfig.database}`);
                }
                this.cache = new DbCache(this.procedures);
                return pool;
            })
            .recoverWith(_ => {
                if (attempts < 0) {
                    console.error(`Maximum number of retries exceeded`);
                    // Can't throw inside an IO
                    process.exit(1);
                }
                console.log(`Unable to connect to ${this.dbConfig.database}, ${attempts} retries remaining`);
                return this.getConnection(attempts - 1)
                    .delayExecution(3000);
            });
    }

    private getConnectionPool(): ConnectionPool {
        return new ConnectionPool(this.dbConfig);
    }

}
