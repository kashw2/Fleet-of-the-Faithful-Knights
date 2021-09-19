import {ApiBase} from "./api-base";
import {Either, Left} from "funfix-core";
import {JsonSerializer} from "@kashw2/lib-util";
import {List, Set} from "immutable";

export class SerializedApiBase extends ApiBase {

    constructor(uri: string) {
        super(uri);
    }

    /**
     * For now I think if we want anything other than a List, we can just call a transformation method.
     * Although this would mean we have to unwrap the Either...
     */

    sendRequestListSerialized<A>(
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        serializer: JsonSerializer<A>,
        headers: object = this.getHeaders(),
        body?: any,
    ): Promise<Either<string, List<A>>> {
        return this.sendRequest(endpoint, method, headers, body)
            .then(v => {
                if (v.isLeft()) {
                    return Left(v.value);
                }
                return v.map(x => serializer.fromJsonArray(x));
            })
            .catch(err => Left(err));
    }

    sendRequestSerialized<A>(
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        serializer: JsonSerializer<A>,
        headers: object = this.getHeaders(),
        body?: any,
    ): Promise<Either<string, A>> {
        return this.sendRequest(endpoint, method, headers, body)
            .then(v => {
                if (v.isLeft()) {
                    return Left(v.value);
                }
                return v.map(x => serializer.fromJson(x));
            })
            .catch(err => Left(err));
    }

}
