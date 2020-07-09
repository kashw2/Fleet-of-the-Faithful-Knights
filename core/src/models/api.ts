import {Either, Left, Right, Some} from "funfix-core";
import {Url} from "./url";
import {SimpleJsonSerializer} from "../misc/simple-json-serializer";
import axios, {AxiosError} from "axios";
import {List, Set, Collection} from "immutable";
import {Method, Primitive} from "../misc/type-defs";
import {parseNumber, parseString} from "..";

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
            case 409:
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

    private sendGetRequestKeyParsable(
        location: string,
        headers: object = this.getHeaders(),
        parser: (v: any) => any,
        key: string,
    ): Promise<Either<string, any>> {
        return axios.get(this.getBaseUrl().concat(location), {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(parser(x.data[key]).value!);
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
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
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendGetRequestNumber(
        location: string,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, number>> {
        return axios.get(this.getBaseUrl().concat(location), {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(parseNumber(x.data).get());
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendGetRequestNumberList<T>(
        location: string,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, List<number>>> {
        return axios.get(this.getBaseUrl().concat(location), {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(List(x.data).map(val => parseNumber(Some(val)).value!));
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendGetRequestParsable(
        location: string,
        headers: object = this.getHeaders(),
        parser: (v: any) => any,
    ): Promise<Either<string, any>> {
        return axios.get(this.getBaseUrl().concat(location), {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(parser(x.data).value!);
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendGetRequestPrimitive<T>(
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
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
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
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendGetRequestString(
        location: string,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, string>> {
        return axios.get(this.getBaseUrl().concat(location), {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(parseString(x.data).get());
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendGetRequestStringList<T>(
        location: string,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, List<string>>> {
        return axios.get(this.getBaseUrl().concat(location), {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(List(x.data).map(val => parseString(val).value!));
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendGetRequestStringSet<T>(
        location: string,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, Set<string>>> {
        return axios.get(this.getBaseUrl().concat(location), {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(Set(x.data).map(val => parseString(val).value!));
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendPostRequestKeyParsable(
        location: string,
        headers: object = this.getHeaders(),
        parser: (v: any) => any,
        key: string,
        body?: unknown,
    ): Promise<Either<string, any>> {
        return axios.post(this.getBaseUrl().concat(location), body, {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(parser(x.data[key]).value!);
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
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
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendPostRequestNumber(
        location: string,
        headers: object = this.getHeaders(),
        body?: unknown,
    ): Promise<Either<string, number>> {
        return axios.post(this.getBaseUrl().concat(location), body, {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(parseNumber(x.data).value!);
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendPostRequestNumberList<T>(
        location: string,
        headers: object = this.getHeaders(),
        body?: unknown
    ): Promise<Either<string, List<number>>> {
        return axios.post(this.getBaseUrl().concat(location), body, {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(List(x.data).map(val => parseNumber(Some(val)).value!));
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendPostRequestParsable(
        location: string,
        headers: object = this.getHeaders(),
        parser: (v: any) => any,
        body?: unknown,
    ): Promise<Either<string, any>> {
        return axios.post(this.getBaseUrl().concat(location), body, {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(parser(x.data).value!);
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendPostRequestPrimitive<T>(
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
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
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
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendPostRequestString(
        location: string,
        headers: object = this.getHeaders(),
        body?: unknown,
    ): Promise<Either<string, string>> {
        return axios.post(this.getBaseUrl().concat(location), body, {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(parseString(x.data).value!);
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendPostRequestStringList<T>(
        location: string,
        headers: object = this.getHeaders(),
        body?: unknown
    ): Promise<Either<string, List<string>>> {
        return axios.post(this.getBaseUrl().concat(location), body, {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(List(x.data).map(val => parseString(Some(val)).value!));
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    private sendPostRequestStringSet<T>(
        location: string,
        headers: object = this.getHeaders(),
        body?: unknown
    ): Promise<Either<string, Set<string>>> {
        return axios.post(this.getBaseUrl().concat(location), body, {
                headers,
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status}: ${x.statusText} - ${x.data}`);
                }
                return Right(Set(x.data).map(val => parseString(Some(val)).value!));
            })
            // @ts-ignore
            .catch((x: AxiosError) => Left(`${x.response.status}: ${x.response.statusText!} - ${x.response.data || x.message}`));
    }

    sendRequestKeyParsable(
        location: string,
        headers: object = this.getHeaders(),
        method: Method,
        parser: (v: any) => any,
        key: string,
        body?: unknown
    ): Promise<Either<string, any>> {
        switch (method) {
            case "GET":
                return this.sendGetRequestKeyParsable(location, headers, parser, key);
            case "POST":
                return this.sendPostRequestKeyParsable(location, headers, parser, key, body);
            default:
                throw new Error(`Unsupported method type '${method}'`);
        }
    }

    sendRequestNumber<T>(
        location: string,
        headers: object = this.getHeaders(),
        method: Method,
        body?: unknown,
    ): Promise<Either<string, number>> {
        switch (method) {
            case "GET":
                return this.sendGetRequestNumber(location, headers);
            case "POST":
                return this.sendPostRequestNumber(location, headers, body);
            default:
                throw new Error(`Unsupported method type '${method}'`);
        }
    }

    sendRequestNumberList<T>(
        location: string,
        headers: object = this.getHeaders(),
        method: Method,
        body?: unknown,
    ): Promise<Either<string, List<number>>> {
        switch (method) {
            case "GET":
                return this.sendGetRequestNumberList(location, headers);
            case "POST":
                return this.sendPostRequestNumberList(location, headers, body);
            default:
                throw new Error(`Unsupported method type '${method}'`);
        }
    }

    sendRequestParsable(
        location: string,
        headers: object = this.getHeaders(),
        method: Method,
        parser: (v: any) => any,
        body?: unknown
    ): Promise<Either<string, any>> {
        switch (method) {
            case "GET":
                return this.sendGetRequestParsable(location, headers, parser);
            case "POST":
                return this.sendPostRequestParsable(location, headers, parser, body);
            default:
                throw new Error(`Unsupported method type '${method}'`);
        }
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

    sendRequestString<T>(
        location: string,
        headers: object = this.getHeaders(),
        method: Method,
        body?: unknown,
    ): Promise<Either<string, string>> {
        switch (method) {
            case "GET":
                return this.sendGetRequestString(location, headers);
            case "POST":
                return this.sendPostRequestString(location, headers, body);
            default:
                throw new Error(`Unsupported method type '${method}'`);
        }
    }

    sendRequestStringList<T>(
        location: string,
        headers: object = this.getHeaders(),
        method: Method,
        body?: unknown,
    ): Promise<Either<string, List<string>>> {
        switch (method) {
            case "GET":
                return this.sendGetRequestStringList(location, headers);
            case "POST":
                return this.sendPostRequestStringList(location, headers, body);
            default:
                throw new Error(`Unsupported method type '${method}'`);
        }
    }

    sendRequestStringSet<T>(
        location: string,
        headers: object = this.getHeaders(),
        method: Method,
        body?: unknown,
    ): Promise<Either<string, Set<string>>> {
        switch (method) {
            case "GET":
                return this.sendGetRequestStringSet(location, headers);
            case "POST":
                return this.sendPostRequestStringSet(location, headers, body);
            default:
                throw new Error(`Unsupported method type '${method}'`);
        }
    }

}
