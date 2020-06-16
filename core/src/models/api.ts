import {Either, Left, Right} from "funfix-core";
import {Url} from "./url";
import {SimpleJsonSerializer} from "../misc/simple-json-serializer";
import axios, {AxiosError} from "axios";
import {List} from "immutable";
import {Primitive} from "../misc/type-defs";

type Method = "POST" | "GET";

export class Api {

    constructor(readonly url: Url) {
    }

    public getBaseUrl(): string {
        return this.url.getUri();
    }

    private getHeaders(): object {
        return {
            "Content-Type": "application/json",
        };
    }

    private isFailureStatusCode(statusCode: number): boolean {
        switch (statusCode) {
            case 400:
            case 401:
            case 403:
            case 404:
            case 429:
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

    private sendGetRequestListSerialized<T>(
        location: string,
        serializer: SimpleJsonSerializer<T>,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, List<T>>> {
        return axios.get(this.getBaseUrl().concat(location), {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(serializer.fromJsonArray(x.data));
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText} - ${x.message}`));
    }

    sendGetRequestPrimitive<T>(
        location: string,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, Primitive>> {
        return axios.get(this.getBaseUrl().concat(location), {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(x.data);
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText} - ${x.message}`));
    }

    private sendGetRequestSerialized<T>(
        location: string,
        serializer: SimpleJsonSerializer<T>,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, T>> {
        return axios.get(this.getBaseUrl().concat(location), {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(serializer.fromJson(x.data));
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText} - ${x.message}`));
    }

    private sendPostRequestListSerialized<T>(
        location: string,
        serializer: SimpleJsonSerializer<T>,
        headers: object = this.getHeaders(),
        body?: unknown,
    ): Promise<Either<string, List<T>>> {
        return axios.post(this.getBaseUrl().concat(location), body, {
            headers,
        })
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(serializer.fromJsonArray(x.data));
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText} - ${x.message}`));
    }

    sendPostRequestPrimitive<T>(
        location: string,
        headers: object = this.getHeaders(),
        body?: unknown,
    ): Promise<Either<string, Primitive>> {
        return axios.post(this.getBaseUrl().concat(location), body, {
            headers,
        })
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(x.data);
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText} - ${x.message}`));
    }

    private sendPostRequestSerialized<T>(
        location: string,
        serializer: SimpleJsonSerializer<T>,
        headers: object = this.getHeaders(),
        body?: unknown,
    ): Promise<Either<string, T>> {
        return axios.post(this.getBaseUrl().concat(location), body, {
            headers,
        })
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(serializer.fromJson(x.data));
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText} - ${x.message}`));
    }

    // This method is meant to be used in the context of a Monad as it can return a Right of Primitive
    // It's assumed that it will be used inside of a Monad where you can control the inputs and outputs individually
    sendRequestPrimitive<T>(
        location: string,
        headers: object = this.getHeaders(),
        method: Method,
        body?: unknown,
    ): Promise<Either<string, Primitive>> {
        switch (method) {
            case "GET":
                return this.sendGetRequestPrimitive(location, headers);
            case "POST":
                return this.sendPostRequestPrimitive(location, headers, body)
            default:
                throw new Error(`Unsupported method type '${method}'`);
        }
    }

    sendRequestSerialized<T>(
        location: string,
        serializer: SimpleJsonSerializer<T>,
        headers: object = this.getHeaders(),
        method: Method,
        body?: unknown,
    ): Promise<Either<string, T>> {
        switch (method) {
            case "GET":
                return this.sendGetRequestSerialized(location, serializer, headers);
            case "POST":
                return this.sendPostRequestSerialized(location, serializer, headers, body);
            default:
                throw new Error(`Unsupported method type '${method}'`);
        }
    }

    sendRequestSerializedList<T>(
        location: string,
        serializer: SimpleJsonSerializer<T>,
        headers: object = this.getHeaders(),
        method: Method,
        body?: unknown,
    ): Promise<Either<string, List<T>>> {
        switch (method) {
            case "GET":
                return this.sendGetRequestListSerialized(location, serializer, headers);
            case "POST":
                return this.sendPostRequestListSerialized(location, serializer, headers, body);
            default:
                throw new Error(`Unsupported method type '${method}'`)
        }
    }


}
