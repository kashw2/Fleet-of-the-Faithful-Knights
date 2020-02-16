import {None, Option} from "funfix-core";
import {Group} from "./group";

export class User {

    constructor(
        readonly id: Option<number> = None,
        readonly name: Option<string> = None,
        readonly password: Option<string> = None,
        readonly group: Option<Group> = None,
    ) {
    }

    getGroup(): Option<Group> {
        return this.group;
    }

    getId(): Option<number> {
        return this.id;
    }

    getName(): Option<string> {
        return this.name;
    }

    getPassword(): Option<string> {
        return this.password;
    }

    isDeveloper(): boolean {
        return this.getGroup()
            .flatMap(g => g.getName())
            .contains("Developer");
    }

    isGrandMaster(): boolean {
        return this.getGroup()
            .flatMap(g => g.getName())
            .contains("Grand Master");
    }

    isKnight(): boolean {
        return this.getGroup()
            .flatMap(g => g.getName())
            .contains("Knight");
    }

    isKnightCommander(): boolean {
        return this.getGroup()
            .flatMap(g => g.getName())
            .contains("Knight Commander");
    }

    isKnightLieutenant(): boolean {
        return this.getGroup()
            .flatMap(g => g.getName())
            .contains("Knight Lieutenant");
    }

    isSergeant(): boolean {
        return this.getGroup()
            .flatMap(g => g.getName())
            .contains("Sergeant");
    }

    isSergeantFirstClass(): boolean {
        return this.getGroup()
            .flatMap(g => g.getName())
            .contains("Sergeant First Class");
    }

}
