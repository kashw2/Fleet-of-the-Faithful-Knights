import {Either} from "funfix-core";
import {List} from "immutable";
import {IRecordSet} from "mssql";
import {DbUser, DbUserJsonSerializer} from "../../../core/src/models/db/db-user";
import {DbRequest} from "../db-request";

export class DbInsert {

    constructor(readonly requests: DbRequest) {
    }

    insertUser(user: DbUser, modifiedBy: string = "System"): Promise<Either<string, IRecordSet<any>>> {
        return this.requests.sendRequest("ssp_InsertUser", List.of(`@User = '${DbUserJsonSerializer.instance.toJsonString(user)}'`, `@ModifiedBy = ${modifiedBy}`));
    }

}
