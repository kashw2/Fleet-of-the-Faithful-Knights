import {Either, Left, Right} from "funfix";
import {AxiosRequestConfig, default as axios} from 'axios';

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

    private hasError(status: number): boolean {
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
    ): Promise<Either<string, any>> {
        console.info(`Sending ${method} Request to ${this.getFullUrl(endpoint)}`);
        return axios({
            method,
            headers,
            data: body,
            url: this.getFullUrl(endpoint)
        } as AxiosRequestConfig).then(v => {
            if (this.hasError(v.status)) {
                console.error(v.statusText);
                console.info(`${this.getFullUrl(endpoint)} - ${v.data}`);
                return Left(v.data);
            }
            return Right(v.data);
        })
            .catch(err => Left(err));
    }

}
