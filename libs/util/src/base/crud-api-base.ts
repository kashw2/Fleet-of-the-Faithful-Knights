import {SerializedApiBase} from "./serialized-api-base";
import {Either, Left} from "funfix-core";
import {List} from "immutable";
import {JsonSerializer} from "../json-serializer";

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
        headers: object = this.getHeaders(),
        body?: any,
    ): Promise<Either<string, A>> {
        return this.sendRequestSerialized(
            this.getEndpoint(),
            "POST",
            serializer,
            headers,
            body,
        )
            .catch(err => Left(err));
    }

    sendCreateRequestList<A>(
        serializer: JsonSerializer<A>,
        headers: object = this.getHeaders(),
        body?: any,
    ): Promise<Either<string, List<A>>> {
        return this.sendRequestListSerialized(
            this.getEndpoint(),
            "POST",
            serializer,
            headers,
            body,
        )
            .catch(err => Left(err));
    }

    sendDeleteRequest<A>(
        serializer: JsonSerializer<A>,
        headers: object = this.getHeaders(),
        body?: any,
    ): Promise<Either<string, A>> {
        return this.sendRequestSerialized(
            this.getEndpoint(),
            "DELETE",
            serializer,
            headers,
            body,
        )
            .catch(err => Left(err));
    }

    sendDeleteRequestList<A>(
        serializer: JsonSerializer<A>,
        headers: object = this.getHeaders(),
        body?: any,
    ): Promise<Either<string, List<A>>> {
        return this.sendRequestListSerialized(
            this.getEndpoint(),
            "DELETE",
            serializer,
            headers,
            body,
        )
            .catch(err => Left(err));
    }

    sendReadRequest<A>(
        serializer: JsonSerializer<A>,
        headers: object = this.getHeaders(),
        body?: any,
    ): Promise<Either<string, A>> {
        return this.sendRequestSerialized(
            this.getEndpoint(),
            "GET",
            serializer,
            headers,
            body,
        )
            .catch(err => Left(err));
    }

    sendReadRequestList<A>(
        serializer: JsonSerializer<A>,
        headers: object = this.getHeaders(),
        body?: any,
    ): Promise<Either<string, List<A>>> {
        return this.sendRequestListSerialized(
            this.getEndpoint(),
            "GET",
            serializer,
            headers,
            body,
        )
            .catch(err => Left(err));
    }

    sendUpdateRequest<A>(
        serializer: JsonSerializer<A>,
        headers: object = this.getHeaders(),
        body?: any,
    ): Promise<Either<string, A>> {
        return this.sendRequestSerialized(
            this.getEndpoint(),
            "PUT",
            serializer,
            headers,
            body,
        )
            .catch(err => Left(err));
    }

    sendUpdateRequestList<A>(
        serializer: JsonSerializer<A>,
        headers: object = this.getHeaders(),
        body?: any,
    ): Promise<Either<string, List<A>>> {
        return this.sendRequestListSerialized(
            this.getEndpoint(),
            "PUT",
            serializer,
            headers,
            body,
        )
            .catch(err => Left(err));
    }

}
