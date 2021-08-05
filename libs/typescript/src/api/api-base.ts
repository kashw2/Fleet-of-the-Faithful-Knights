import {Either, Left, Right} from "funfix-core";
import {default as axios} from 'axios';

export class ApiBase {

    constructor(private uri: string) {
    }

    public getFullUrl(endpoint: string): string {
        return this.getUri().endsWith('/')
            ? this.getUri().concat(endpoint)
            : `${this.getUri()}/${endpoint}`;
    }

    protected getHeaders(): object {
        return {};
    }

    protected getUri(): string {
        return this.uri;
    }

    public sendRequest(
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        headers: object = this.getHeaders(),
        body?: any,
    ): Promise<Either<string, any>> {
        console.info(`Sending ${method} Request to ${this.getFullUrl(endpoint)}`);
        return axios({
            method,
            headers,
            data: body,
            url: this.getFullUrl(endpoint)
        }).then(v => Right(v.data))
            .catch(err => Left(err));
    }

}
