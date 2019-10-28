import {None, Option} from "funfix-core";
import {List} from "immutable";
import {Moment} from "moment";
import {User} from "./user";

export class Vote {

    constructor(
        readonly id: Option<number> = None,
        readonly sponsor: Option<User> = None,
        readonly time: Option<Moment> = None,
        readonly primaryOrg: Option<boolean> = None,
        readonly dateOfMembership: Option<Moment> = None,
        readonly dateOfLastRankAssignment: Option<Moment> = None,
        readonly sponsoredRank: Option<string> = None,
        readonly notes: Option<string> = None,
        readonly voters: List<User> = List(),
        readonly date: Option<Moment> = None,
        readonly assigned: Option<boolean> = None,
        readonly veto: Option<boolean> = None,
    ) {
    }

    getAssigned(): Option<boolean> {
        return this.assigned;
    }

    getDate(): Option<Moment> {
        return this.date;
    }

    getDateOfLastRankAssignment(): Option<Moment> {
        return this.dateOfLastRankAssignment;
    }

    getDateOfMembership(): Option<Moment> {
        return this.dateOfMembership;
    }

    getId(): Option<number> {
        return this.id;
    }

    getNotes(): Option<string> {
        return this.notes;
    }

    getNumberOfCurrentVotes(): number {
        return this.getVoters().size;
    }

    getPrimaryOrg(): Option<boolean> {
        return this.primaryOrg;
    }

    getSponsor(): Option<User> {
        return this.sponsor;
    }

    getSponsoredRank(): Option<string> {
        return this.sponsoredRank;
    }

    getTime(): Option<Moment> {
        return this.time;
    }

    getVeto(): Option<boolean> {
        return this.veto;
    }

    getVoters(): List<User> {
        return this.voters;
    }

    isSponsoredForCompanionAtArms(): boolean {
        return this.getSponsoredRank()
            .contains("Companion at Arms");
    }

    isSponsoredForKnightCommander(): boolean {
        return this.getSponsoredRank()
            .contains("Knight Commander");
    }

    isSponsoredForKnightLieutenant(): boolean {
        return this.getSponsoredRank()
            .contains("Knight Lieutenant");
    }

    isSponsoredForMasterCommander(): boolean {
        return this.getSponsoredRank()
            .contains("Master Commander");
    }

    isSponsoredForSergeant(): boolean {
        return this.getSponsoredRank()
            .contains("Sergeant");
    }

    isSponsoredForSergeant1stClass(): boolean {
        return this.getSponsoredRank()
            .contains("Sergeant 1st Class");
    }

    isSponsoredForSquire(): boolean {
        return this.getSponsoredRank()
            .contains("Squire");
    }

    isVetod(): boolean {
        return this.getVeto()
            .contains(true);
    }

}
