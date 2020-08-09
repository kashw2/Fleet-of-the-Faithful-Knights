import {None, Option, Some} from "funfix-core";
import {List, Set} from "immutable";
import {candidateKey, commentsKey, dateKey, groupKey, idKey, notesKey, sponsorKey, statusKey, votersKey} from "../misc/json-keys";
import {parseBoolean, parseNumber, parseSerialized, parseSerializedList, parseSerializedSet, parseString} from "../util/object-utils";
import {JsonBuilder} from "../misc/json-builder";
import {SimpleJsonSerializer} from "../misc/simple-json-serializer";
import {MomentUtils} from "../util/moment-utils";
import {Candidate, CandidateJsonSerializer} from "./candidate";
import {User, UserJsonSerializer} from "./user";
import {Voter, VoterJsonSerializer} from "./voter";
import {FfkDateFormat} from "../misc/type-defs";
import {CommentJsonSerializer, Comment} from "./comment";

export class Vote {

    constructor(
        private id: Option<number> = None,
        private sponsor: Option<User> = None,
        private candidate: Option<Candidate> = None,
        private group: Option<string> = None,
        private notes: Option<string> = None,
        private voters: Set<Voter> = Set(),
        private status: Option<boolean> = Some(false),
        private comments: List<Comment> = List(),
        private createdDate: Option<string> = None,
    ) {
    }

    // TODO: Make this take a createdDate on use
    public static forVoteCreation(
        candidate: Candidate,
        sponsor: User,
        group: string,
        notes: string,
    ): Vote {
        return new Vote(
            None,
            Option.of(sponsor),
            Option.of(candidate),
            Option.of(group),
            Option.of(notes),
            Set(),
            Some(false),
            List(),
            None
        );
    }

    public getCandidate(): Option<Candidate> {
        return this.candidate;
    }

    public getCandidateName(): Option<string> {
        return this.getCandidate()
            .flatMap(c => c.getDiscordUsername());
    }

    public getComments(): List<Comment> {
        return this.comments;
    }

    public getCreatedDate(): Option<string> {
        return this.createdDate;
    }

    public getFormattedCreatedDate(format: FfkDateFormat): Option<string> {
        return this.getCreatedDate()
            .map(datetime => MomentUtils.formatString(datetime, format));
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

    public getSponsorId(): Option<number> {
        return this.getSponsor()
            .flatMap(u => u.getId());
    }

    public getSponsorUsername(): Option<string> {
        return this.getSponsor()
            .flatMap(s => s.getUsername());
    }

    public getStatus(): Option<boolean> {
        return this.status;
    }

    public getVoters(): Set<Voter> {
        return this.voters;
    }

    public hasFailed(): boolean {
        return this.getStatus()
                .contains(false)
            && this.getVoters()
                .map(v => v.didDeny())
                .size > 4;
    }

    public hasPassed(): boolean {
        return this.getStatus()
            .contains(true)
            || this.getVoters()
                .filter(v => v.didAffirm())
                .size >= 4;
    }

    public isCAAVote(): boolean {
        return this.getGroup()
            .contains("Companion at Arms");
    }

    public isEmpty(): boolean {
        return this.getId().isEmpty()
            && this.getSponsor().isEmpty()
            && this.getCandidate().isEmpty()
            && this.getGroup().isEmpty()
            && this.getNotes().isEmpty()
            && this.getVoters().isEmpty()
            && this.getStatus().isEmpty()
            && this.getComments().isEmpty()
            && this.getCreatedDate().isEmpty();
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

    public shouldBeInSergeantVoting(): boolean {
        return this.isSergeantFirstClassVote()
            || this.isSergeantVote();
    }

}

export class VoteJsonSerializer extends SimpleJsonSerializer<Vote> {

    static instance: VoteJsonSerializer = new VoteJsonSerializer();

    fromJson(json: any): Vote {
        return new Vote(
            parseNumber(json[idKey]),
            parseSerialized(json[sponsorKey], UserJsonSerializer.instance),
            parseSerialized(json[candidateKey], CandidateJsonSerializer.instance),
            parseString(json[groupKey]),
            parseString(json[notesKey]),
            parseSerializedSet(json[votersKey], VoterJsonSerializer.instance),
            parseBoolean(json[statusKey]),
            parseSerializedList(json[commentsKey], CommentJsonSerializer.instance),
            parseString(json[dateKey]),
        );
    }

    toJson(value: Vote, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptionalSerialized(value.getSponsor(), sponsorKey, UserJsonSerializer.instance)
            .addOptionalSerialized(value.getCandidate(), candidateKey, CandidateJsonSerializer.instance)
            .addOptional(value.getGroup(), groupKey)
            .addOptional(value.getNotes(), notesKey)
            .addSetSerialized(value.getVoters(), votersKey, VoterJsonSerializer.instance)
            .addOptional(value.getStatus(), statusKey)
            .addListSerialized(value.getComments(), commentsKey, CommentJsonSerializer.instance)
            .addOptional(value.getCreatedDate(), dateKey)
            .build();
    }

}
