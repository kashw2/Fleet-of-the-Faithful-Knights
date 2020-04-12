import {None, Option} from "funfix-core";
import {List} from "immutable";
import {
    candidateKey,
    dateKey,
    groupKey,
    idKey,
    JsonBuilder,
    notesKey,
    parseBoolean,
    parseList,
    parseNumber,
    parseSerialized,
    parseString,
    SimpleJsonSerializer,
    statusKey,
    userKey,
    votersKey,
} from "..";
import {User, UserJsonSerializer} from "./user";

export class Vote {

    constructor(
        readonly id: Option<number> = None,
        readonly sponsor: Option<User> = None,
        readonly candidate: Option<string> = None,
        readonly group: Option<string> = None,
        readonly notes: Option<string> = None,
        readonly voters: List<User> = List(),
        readonly status: Option<boolean> = None,
        readonly createdDate: Option<string> = None,
    ) {
    }

    public getCandidate(): Option<string> {
        return this.candidate;
    }

    public getCreatedDate(): Option<string> {
        return this.createdDate;
    }

    public getGroup(): Option<string> {
        return this.group;
    }

    public getId(): Option<number> {
        return this.id;
    }

    public getNotes(): Option<string> {
        return this.notes;
    }

    public getSponsor(): Option<User> {
        return this.sponsor;
    }

    public getSponsorUsername(): Option<string> {
        return this.getSponsor()
            .flatMap(s => s.getUsername());
    }

    public getStatus(): Option<boolean> {
        return this.status;
    }

    public getVoters(): List<User> {
        return this.voters;
    }

    public hasPassed(): boolean {
        return this.getStatus()
            .contains(true);
    }

    public isCAAVote(): boolean {
        return this.getGroup()
            .contains("Companion at Arms");
    }

    public isKnightCommanderVote(): boolean {
        return this.getGroup()
            .contains("Knight Commander");
    }

    public isKnightLieutenantVote(): boolean {
        return this.getGroup()
            .contains("Knight Lieutenant");
    }

    public isKnightVote(): boolean {
        return this.getGroup()
            .contains("Knight");
    }

    public isSergeantFirstClassVote(): boolean {
        return this.getGroup()
            .contains("Sergeant First Class");
    }

    public isSergeantVote(): boolean {
        return this.getGroup()
            .contains("Sergeant");
    }

    public isSquireVote(): boolean {
        return this.getGroup()
            .contains("Squire");
    }

    public shouldBeInKnightVoting(): boolean {
        return this.isKnightCommanderVote()
            || this.isKnightLieutenantVote()
            || this.isKnightVote();
    }

}

export class VoteJsonSerializer extends SimpleJsonSerializer<Vote> {

    static instance: VoteJsonSerializer = new VoteJsonSerializer();

    fromJson(json: any): Vote {
        return new Vote(
            parseNumber(json[idKey]),
            parseSerialized(json[userKey], UserJsonSerializer.instance),
            parseString(json[candidateKey]),
            parseString(json[groupKey]),
            parseString(json[notesKey]),
            parseList(json[votersKey]),
            parseBoolean(json[statusKey]),
            parseString(json[dateKey]),
        );
    }

    toJson(value: Vote, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptionalSerialized(value.getSponsor(), userKey, UserJsonSerializer.instance)
            .addOptional(value.getCandidate(), candidateKey)
            .addOptional(value.getGroup(), groupKey)
            .addOptional(value.getNotes(), notesKey)
            .addList(value.getVoters(), votersKey)
            .addOptional(value.getStatus(), statusKey)
            .addOptional(value.getCreatedDate(), dateKey)
            .build();
    }

}
