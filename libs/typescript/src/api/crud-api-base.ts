import {SerializedApiBase} from "./serialized-api-base";
import {Either} from "funfix-core";
import {List} from "immutable";
import {JsonSerializer} from "@kashw2/lib-util";

export class CrudApiBase extends SerializedApiBase {

    /**
     * The way this class is constructed would mean that any endpoint with query params would lose functionality that those query params
     * provide. This is of course unless there is some sort of Builder used to make the query param apart of the formed endpoint that is
     * parse into the constructor as part of the uri. That'd be kinda nasty though.
     */

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
            this.getEndpoint(),
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
            this.getEndpoint(),
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
            this.getEndpoint(),
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
            this.getEndpoint(),
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
            this.getEndpoint(),
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
            this.getEndpoint(),
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
            this.getEndpoint(),
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
            this.getEndpoint(),
            "PUT",
            serializer,
            body,
            headers,
        );
    }

}
