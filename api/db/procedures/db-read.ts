import {Either} from "funfix-core";
import {List, Set} from "immutable";
import {
    Candidate,
    CandidateJsonSerializer,
    Enum,
    News,
    NewsJsonSerializer,
    User,
    UserJsonSerializer,
    Vote,
    VoteJsonSerializer
} from "@ffk/lib-ts";
import {DbRequest} from "../db-request";

export class DbRead {

    constructor(private requests: DbRequest) {
    }

    getCandidates(): Promise<Either<string, List<Candidate>>> {
        return this.requests.sendRequestListSerialized("ssp_json_GetCandidates", List.of(), CandidateJsonSerializer.instance);
    }

    // TODO: This should return a Promise<Either<string, Set<string>>>
    getGroups(): Promise<Either<string, Set<Enum>>> {
        return this.requests.sendRequestEnumSet("ssp_json_GetGroups", List.of());
    }

    getNews(): Promise<Either<string, List<News>>> {
        return this.requests.sendRequestListSerialized("ssp_json_GetNews", List.of(), NewsJsonSerializer.instance);
    }

    getPermissions(): Promise<Either<string, Set<Enum>>> {
        return this.requests.sendRequestEnumSet("ssp_json_GetPermissions", List.of());
    }

    getUsers(): Promise<Either<string, List<User>>> {
        return this.requests.sendRequestListSerialized("ssp_json_GetUsers", List.of(), UserJsonSerializer.instance);
    }

    getVotes(): Promise<Either<string, List<Vote>>> {
        return this.requests.sendRequestListSerialized("ssp_json_GetVotes", List.of(), VoteJsonSerializer.instance);
    }

}
