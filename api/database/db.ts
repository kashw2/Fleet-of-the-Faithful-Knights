import {config, ConnectionPool} from "mssql";
import {DbRequests} from "./db-requests";

export class Database {

    constructor() {
        this.connection = this.getConnection();
        this.requests = new DbRequests(this);
    }

    connection: Promise<ConnectionPool>;

    dbConfig: config = {
        database: "ffk-voting",
        parseJSON: true,
        password: "80x%jUJ#7",
        server: "127.0.0.1",
        user: "ffk",
    };

    requests: DbRequests;

    private async getConnection(): Promise<ConnectionPool> {
        const connection = await new ConnectionPool(this.dbConfig).connect();
        if (connection.connecting) {
            console.log(`Attempting to connect to ${this.dbConfig.database}`);
        } else if (connection.connected) {
            console.log(`Successfully connected to ${this.dbConfig.database} on ${this.dbConfig.server}`);
        } else {
            console.log(`Unexpected error connecting to ${this.dbConfig.database} on ${this.dbConfig.server}`);
        }
        return connection;
    }

}
