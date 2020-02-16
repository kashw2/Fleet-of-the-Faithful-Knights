import {None, Option} from "funfix-core";

export class Group {

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

    isSergeant(): boolean {
        return this.getName()
            .contains("Sergeant");
    }

    isSergeantFirstClass(): boolean {
        return this.getName()
            .contains("Sergeant First Class");
    }

}
