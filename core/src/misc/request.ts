import axios from "axios";
import {Either, Left, Right} from "funfix-core";
import {SimpleJsonSerializer} from "./simple-json-serializer";

type Methods = "POST" | "GET";

export class Request {

    constructor(
        readonly url: string,
        readonly method: Methods,
        readonly headers?: object,
        readonly body?: object,
    ) {
    }

    private getBody(): object {
        return this.body;
    }

    private getHeaders(): object {
        return {
            "Content-Type": "application/json",
        };
    }

    private getMethod(): Methods {
        return this.method;
    }

    private getUrl(): string {
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

    private sendGetRequestSerialized<T>(serializer: SimpleJsonSerializer<T>): Promise<Either<string, T>> {
        return axios.get(this.getUrl(), {
                headers: this.getHeaders(),
            },
        )
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status} ${x.statusText} - ${x.data}`);
                }
                return Right(x.data);
            })
            .catch(x => Left(x));
    }

    private sendPostRequestSerialized<T>(serializer: SimpleJsonSerializer<T>): Promise<Either<string, T>> {
        return axios.post(this.getUrl(), this.getBody(), {
            headers: this.getHeaders(),
        })
            .then(x => {
                if (this.isFailureStatusCode(x.status)) {
                    return Left(`${x.status} ${x.statusText} - ${x.data}`);
                }
                return Right(x.data);
            })
            .catch(x => Left(x));
    }

    sendRequestSerialized<T>(serializer: SimpleJsonSerializer<T>): Promise<Either<string, T>> {
        switch (this.getMethod()) {
            case "GET":
                return this.sendGetRequestSerialized(serializer);
            case "POST":
                return this.sendPostRequestSerialized(serializer);
            default:
                throw new Error(`Unsupported method type '${this.getMethod()}'`);
        }
    }

}
