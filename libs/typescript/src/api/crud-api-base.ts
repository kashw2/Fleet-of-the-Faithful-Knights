import {SerializedApiBase} from "./serialized-api-base";
import {Either} from "funfix-core";
import {List} from "immutable";
import {JsonSerializer} from "@kashw2/lib-util";

export class CrudApiBase extends SerializedApiBase {

    constructor(uri: string, private endpoint: string) {
        super(uri);
    }

    private getEndpoint(): string {
        return this.endpoint;
    }

    /**
     * The assumption made here is that all Crud operations will be serialized in some way shape or form.
     * This means that all request methods on this class should return either [A] or [_[A]]
     */

    sendCreateRequest<A>(
        serializer: JsonSerializer<A>,
        body: any,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, A>> {
        return this.sendRequestSerialized(
            this.getFullUrl(this.getEndpoint()),
            "POST",
            serializer,
            body,
            headers,
        );
    }

    sendCreateRequestList<A>(
        serializer: JsonSerializer<A>,
        body: any,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, List<A>>> {
        return this.sendRequestListSerialized(
            this.getFullUrl(this.getEndpoint()),
            "POST",
            serializer,
            body,
            headers,
        );
    }

    sendDeleteRequest<A>(
        serializer: JsonSerializer<A>,
        body: any,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, A>> {
        return this.sendRequestSerialized(
            this.getFullUrl(this.getEndpoint()),
            "DELETE",
            serializer,
            body,
            headers,
        );
    }

    sendDeleteRequestList<A>(
        serializer: JsonSerializer<A>,
        body: any,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, List<A>>> {
        return this.sendRequestListSerialized(
            this.getFullUrl(this.getEndpoint()),
            "DELETE",
            serializer,
            body,
            headers,
        );
    }

    sendReadRequest<A>(
        serializer: JsonSerializer<A>,
        body: any,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, A>> {
        return this.sendRequestSerialized(
            this.getFullUrl(this.getEndpoint()),
            "GET",
            serializer,
            body,
            headers,
        );
    }

    sendReadRequestList<A>(
        serializer: JsonSerializer<A>,
        body: any,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, List<A>>> {
        return this.sendRequestListSerialized(
            this.getFullUrl(this.getEndpoint()),
            "GET",
            serializer,
            body,
            headers,
        );
    }

    sendUpdateRequest<A>(
        serializer: JsonSerializer<A>,
        body: any,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, A>> {
        return this.sendRequestSerialized(
            this.getFullUrl(this.getEndpoint()),
            "PUT",
            serializer,
            body,
            headers,
        );
    }

    sendUpdateRequestList<A>(
        serializer: JsonSerializer<A>,
        body: any,
        headers: object = this.getHeaders(),
    ): Promise<Either<string, List<A>>> {
        return this.sendRequestListSerialized(
            this.getFullUrl(this.getEndpoint()),
            "PUT",
            serializer,
            body,
            headers,
        );
    }

}
