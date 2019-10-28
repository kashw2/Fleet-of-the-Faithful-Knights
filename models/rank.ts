import {None, Option} from "funfix-core";

export class Rank {

    constructor(
        readonly id: Option<number> = None,
        readonly name: Option<string> = None,
    ) {
    }

    getId(): Option<number> {
        return this.id;
    }

    getName(): Option<string> {
        return this.name;
    }

    isAdmin(): boolean {
        return this.isDeveloper()
            || this.isGrandMaster()
            || this.isMasterCommander()
            || this.isKnightCommander()
            || this.isKnightLieutenant()
            || this.isKnight();
    }

    isDeveloper(): boolean {
        return this.getName()
            .contains("Developer");
    }

    isGrandMaster(): boolean {
        return this.getName()
            .contains("Grand Master");
    }

    isKnight(): boolean {
        return this.getName()
            .contains("Knight");
    }

    isKnightCommander(): boolean {
        return this.getName()
            .contains("Knight Commander");
    }

    isKnightLieutenant(): boolean {
        return this.getName()
            .contains("Knight Lieutenant");
    }

    isMasterCommander(): boolean {
        return this.getName()
            .contains("Master Commander");
    }

    isSergeant(): boolean {
        return this.getName()
            .contains("Sergeant");
    }

    isSergeant1stClass(): boolean {
        return this.getName()
            .contains("Sergeant 1st Class");
    }

}
