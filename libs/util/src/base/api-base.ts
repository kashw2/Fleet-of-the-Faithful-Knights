import {Either, Left, Right} from "funfix-core";
import {Future} from "funfix";
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

export class ApiBase {

    constructor(private uri: string) {
    }

    public getFullUrl(endpoint: string): string {
        return this.getUri().endsWith('/')
            ? this.getUri().trim().concat(endpoint.startsWith('/') ? endpoint.slice(1, endpoint.length).trim() : endpoint.trim())
            : `${this.getUri().trim()}/${endpoint.startsWith('/') ? endpoint.slice(1, endpoint.length).trim() : endpoint.trim()}`;
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
        } as AxiosRequestConfig))
            .flatMap((v: AxiosResponse<any>) => this.hasError(v.status) ? Future.raise(Left(v.data)) : Future.pure(Right(v.data)))
            .recover((error: AxiosError<any>) => Left(error.response?.data?.error ?? error.response?.data));
    }

}
