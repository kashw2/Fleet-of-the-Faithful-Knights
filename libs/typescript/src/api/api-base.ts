import {Either, Left, Right} from "funfix-core";
import {default as axios} from 'axios';

export abstract class ApiBase {

    constructor(private uri: string) {
    }

    private getFullUrl(endpoint: string): string {
        return this.getUri().endsWith('/')
            ? this.getUri().concat(endpoint)
            : `${this.getUri()}/${endpoint}`;
    }

    abstract getHeaders(): object;

    protected getUri(): string {
        return this.uri;
    }

    public sendRequest(
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        headers: object = this.getHeaders(),
    ): Promise<Either<string, any>> {
        return axios({
            method,
            headers,
            url: this.getFullUrl(endpoint)
        }).then(v => Right(v.data))
            .catch(err => Left(err))
    }

}
