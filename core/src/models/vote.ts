import {None, Option} from "funfix-core";
import {List} from "immutable";
import {User, UserJsonSerializer} from "./user";
import {
    candidateKey,
    groupKey,
    idKey,
    JsonBuilder,
    notesKey,
    parseList,
    parseNumber,
    parseSerialized,
    parseString,
    SimpleJsonSerializer, sponsorKey,
    userKey,
    votersKey
} from "..";

export class Vote {

    constructor(
        readonly id: Option<number> = None,
        readonly sponsor: Option<User> = None,
        readonly candidate: Option<string> = None,
        readonly group: Option<string> = None,
        readonly notes: Option<string> = None,
        readonly voters: List<User> = List(),
    ) {
    }

    getCandidate(): Option<string> {
        return this.candidate;
    }

    getGroup(): Option<string> {
        return this.group;
    }

    getId(): Option<number> {
        return this.id;
    }

    getNotes(): Option<string> {
        return this.notes;
    }

    getSponsor(): Option<User> {
        return this.sponsor;
    }

    getVoters(): List<User> {
        return this.voters;
    }

}

export class VoteJsonSerializer extends SimpleJsonSerializer<Vote> {

    static instance: VoteJsonSerializer = new VoteJsonSerializer();

    fromJson(json: any): Vote {
        return new Vote(
            parseNumber(json[idKey]),
            parseSerialized(json[sponsorKey], UserJsonSerializer.instance),
            parseString(json[candidateKey]),
            parseString(json[groupKey]),
            parseString(json[notesKey]),
            parseList(json[votersKey]),
        );
    }

    toJsonImpl(value: Vote, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptionalSerialized(value.getSponsor(), sponsorKey, UserJsonSerializer.instance)
            .addOptional(value.getCandidate(), candidateKey)
            .addOptional(value.getGroup(), groupKey)
            .addOptional(value.getNotes(), notesKey)
            .addList(value.getVoters(), votersKey)
            .build();
    }

}
