import {Either, Left, Right} from "funfix-core";
import {Future} from "funfix";
import axios, {AxiosRequestConfig} from "axios";

export class ApiBase {

    constructor(private uri: string) {
    }

    public getFullUrl(endpoint: string): string {
        return this.getUri().endsWith('/')
            ? this.getUri().concat(endpoint.startsWith('/') ? endpoint.slice(1, endpoint.length) : endpoint)
            : `${this.getUri()}/${endpoint.startsWith('/') ? endpoint.slice(1, endpoint.length) : endpoint}`;
    }

    protected getHeaders(): object {
        return {};
    }

    protected getUri(): string {
        return this.uri;
    }

    protected hasError(status: number): boolean {
        switch (status.toString().charAt(0)) {
            case '3':
            case '4':
            case '5':
                return true;
            default:
                return false;
        }
    }

    public sendRequest(
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        headers: object = this.getHeaders(),
        body?: any,
    ): Future<Either<string, any>> {
        console.info(`Sending ${method} request to ${this.getFullUrl(endpoint)}`);
        return Future.fromPromise(axios({
            method,
            headers,
            data: body,
            url: this.getFullUrl(endpoint)
        } as AxiosRequestConfig)).map(v => Right(v.data))
            .recover(v => Left(v as string));
    }

}
