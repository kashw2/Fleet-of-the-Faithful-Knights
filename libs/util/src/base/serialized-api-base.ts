import {ApiBase} from "./api-base";
import {List} from "immutable";
import {JsonSerializer} from "../json-serializer";
import {Future} from "funfix";
import {FutureUtils} from "../future-utils";

export class SerializedApiBase extends ApiBase {

  constructor(uri: string) {
    super(uri);
  }

  sendRequestListSerialized<A>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    serializer: JsonSerializer<A>,
    headers: object = this.getHeaders(),
    body?: any,
  ): Future<List<A>> {
    return this.sendRequest(endpoint, method, headers, body)
      .flatMap(FutureUtils.fromEither)
      .map(v => serializer.fromJsonArray(v));
  }

  sendRequestSerialized<A>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    serializer: JsonSerializer<A>,
    headers: object = this.getHeaders(),
    body?: any,
  ): Future<A> {
    return this.sendRequest(endpoint, method, headers, body)
      .flatMap(FutureUtils.fromEither)
      .map(v => serializer.fromJson(v));
  }

}
