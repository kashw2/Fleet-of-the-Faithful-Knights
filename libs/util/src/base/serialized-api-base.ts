import {ApiBase} from "./api-base";
import {Either} from "funfix-core";
import {List} from "immutable";
import {JsonSerializer} from "../json-serializer";
import {Future} from "funfix";

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
    ): Future<List<A>> {
        return this.sendRequest(endpoint, method, headers, body)
            .map(v => serializer.fromJsonArray(v.getOrElse(List<A>())));
    }

    sendRequestSerialized<A>(
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        serializer: JsonSerializer<A>,
        headers: object = this.getHeaders(),
        body?: any,
    ): Future<Either<string, A>> {
        return this.sendRequest(endpoint, method, headers, body)
            .map(v => v.map(x => serializer.fromJson(x)));
    }

}
