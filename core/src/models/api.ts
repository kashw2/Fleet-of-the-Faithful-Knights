import {Either, Left, Right} from "funfix-core";
import {Url} from "./url";
import {SimpleJsonSerializer} from "..";
import axios from "axios";
import {List} from "immutable";

type Methods = "POST" | "GET";

export class Api {

    constructor(readonly url: Url) {
    }

    public getBaseUrl(): string {
        return this.getUrl()
            .getUrl()
    }

    private getHeaders(): object {
        return {
            "Content-Type": "application/json",
        };
    }

    public getUrl(): Url {
        return this.url;
    }

    private isFailureStatusCode(statusCode: number): boolean {
        switch (statusCode) {
            case 400:
            case 401:
            case 403:
            case 404:
            case 500:
                return false;
            default:
                return !this.isSuccessStatusCode(statusCode);
        }
    }

    private isSuccessStatusCode(statusCode: number): boolean {
        switch (statusCode) {
            case 100:
            case 200:
            case 202:
                return true;
            default:
                return !this.isFailureStatusCode(statusCode);
        }
    }

    private sendGetRequestListSerialized<T>(serializer: SimpleJsonSerializer<T>, headers: object = this.getHeaders()): Promise<Either<string, List<T>>> {
            return axios.get(this.getBaseUrl(), {
                    headers,
                },
            )
                .then(x => {
                    if (this.isFailureStatusCode(x.status)) {
                        return Left(`${x.status} ${x.statusText} - ${x.data}`);
                    }
                    return Right(serializer.fromJsonArray(x.data));
                })
                .catch(x => Left(x));
    }

    private sendGetRequestSerialized<T>(serializer: SimpleJsonSerializer<T>, headers: object = this.getHeaders()): Promise<Either<string, T>> {
            return axios.get(this.getBaseUrl(), {
                    headers,
                },
            )
                .then(x => {
                    if (this.isFailureStatusCode(x.status)) {
                        return Left(`${x.status} ${x.statusText} - ${x.data}`);
                    }
                    return Right(serializer.fromJson(x.data));
                })
                .catch(x => Left(x));
    }

    private sendPostRequestListSerialized<T>(
        serializer: SimpleJsonSerializer<T>,
        headers: object = this.getHeaders(),
        body: object = {},
        ): Promise<Either<string, List<T>>> {
            return axios.post(this.getBaseUrl(), body, {
                headers,
            })
                .then(x => {
                    if (this.isFailureStatusCode(x.status)) {
                        return Left(`${x.status} ${x.statusText} - ${x.data}`);
                    }
                    return Right(serializer.fromJsonArray(x.data));
                })
                .catch(x => Left(x));
    }

    private sendPostRequestSerialized<T>(serializer: SimpleJsonSerializer<T>, headers: object = this.getHeaders(), body: object = {}): Promise<Either<string, T>> {
            return axios.post(this.getBaseUrl(), body, {
                headers,
            })
                .then(x => {
                    if (this.isFailureStatusCode(x.status)) {
                        return Left(`${x.status} ${x.statusText} - ${x.data}`);
                    }
                    return Right(serializer.fromJson(x.data));
                })
                .catch(x => Left(x));
    }

    sendRequestSerialized<T>(serializer: SimpleJsonSerializer<T>, headers: object = this.getHeaders(), method: Methods, body?: object): Promise<Either<string, T>> {
        switch (method) {
            case "GET":
                return this.sendGetRequestSerialized(serializer, headers);
            case "POST":
                return this.sendPostRequestSerialized(serializer, headers, body);
            default:
                throw new Error(`Unsupported method type '${method}'`);
        }
    }

    sendRequestSerializedList<T>(
        serializer: SimpleJsonSerializer<T>,
        headers: object = this.getHeaders(),
        method: Methods,
        body?: object,
        ): Promise<Either<string, List<T>>> {
        switch (method) {
            case "GET":
                return this.sendGetRequestListSerialized(serializer, headers);
            case "POST":
                return this.sendPostRequestListSerialized(serializer, headers, body);
            default:
                throw new Error(`Unsupported method type '${method}'`)
        }
    }


}
