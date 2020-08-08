import {config, ConnectionPool} from "mssql";
import {from, of} from "rxjs";
import {flatMap, map} from "rxjs/operators";
import {DbCache} from "./db-cache";
import {DbRequest} from "./db-request";
import {DbProcedures} from "./procedures/db-procedures";
import {EitherUtils} from "@ffk/lib-ts";

export class Database {

    constructor() {
        // Stack / Sequential ordering matters
        this.requests = new DbRequest(this);
        this.procedures = new DbProcedures(this.requests);
        this.cache = new DbCache(this.procedures);
    }

    cache: DbCache;
    dbConfig: config = {
        user: this.getFfkDbUser(),
        password: this.getFfkDbPassword(),
        database: this.getFfkDbName(),
        server: this.getFfkDbServer(),
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
            .toPromise();
    }

    private getConnectionPool(): ConnectionPool {
        return new ConnectionPool(this.dbConfig);
    }

    private getFfkDbName(): string {
        const dbName = EitherUtils.liftEither(process.env.FFK_DB_NAME!, "FFK_DB_NAME is undefined");
        if (dbName.isLeft()) {
            throw dbName.value;
        }
        return dbName.get();
    }

    private getFfkDbPassword(): string {
        const dbPassword = EitherUtils.liftEither(process.env.FFK_DB_PASSWORD!, "FFK_DB_PASSWORD is undefined");
        if (dbPassword.isLeft()) {
            throw dbPassword.value;
        }
        return dbPassword.get();
    }

    private getFfkDbServer(): string {
        const dbServer = EitherUtils.liftEither(process.env.FFK_DB_SERVER!, "FFK_DB_SERVER is undefined");
        if (dbServer.isLeft()) {
            throw dbServer.value;
        }
        return dbServer.get();
    }

    private getFfkDbUser(): string {
        const dbUser = EitherUtils.liftEither(process.env.FFK_DB_USER!, "FFK_DB_USER is undefined");
        if (dbUser.isLeft()) {
            throw dbUser.value;
        }
        return dbUser.get();
    }


}
