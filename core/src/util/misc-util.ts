import {Option} from "funfix-core";

export type Group =
    "Developer"
    | "Guest"
    | "Grand Master"
    | "Master Commander"
    | "Knight Commander"
    | "Knight Lieutenant"
    | "Knight"
    | "Sergeant First Class"
    | "Sergeant"
    | "Companion at Arms"
    | "Squire";

export class MiscUtil {

    static getGroupIdFromName(name: Group): number {
        switch (name) {
            case "Developer":
                return 1;
            case "Guest":
                return 2;
            case "Grand Master":
                return 3;
            case "Master Commander":
                return 4;
            case "Knight Commander":
                return 5;
            case "Knight Lieutenant":
                return 6;
            case "Knight":
                return 7;
            case "Sergeant First Class":
                return 8;
            case "Sergeant":
                return 9;
            case "Companion at Arms":
                return 10;
            case "Squire":
                return 11;
            default:
                console.log(`${name} is not a recognised group, defaulting to Guest`);
                return 2;
        }
    }

    static getGroupNameFromDiscordRoleId(role: string): Group {
        switch (role) {
            case "541835139701800962":
                return "Grand Master";
            case "541834583268917248":
                return "Master Commander";
            case "539194625056047106":
                return "Knight Commander";
            // ..
            case "631948957664280586":
                return "Developer";
            case "541834732376424448":
                return "Knight Lieutenant";
            // .
            case "549080433900650536":
                return "Developer";
            case "541839842435137577":
                return "Knight";
            case "539194544575741993":
                return "Sergeant First Class";
            case "541835663373369344":
                return "Sergeant";
            case "539194387674955776":
                return "Companion at Arms";
            case "539194424001953793":
                return "Squire";
            default:
                console.log(`${role} os mpt a recognised discord role, defaulting to Guest`);
                return "Guest";
        }
    }

    static parseGroupOption(name: string): Option<Group> {
        return Option.of(this.parseGroup(name));
    }

    static parseGroup(name: string): Group {
        switch (name) {
            case "Developer":
                return "Developer";
            case "Guest":
                return "Guest";
            case "Grand Master":
                return "Grand Master";
            case "Master Commander":
                return "Master Commander";
            case "Knight Commander":
                return "Knight Commander";
            case "Knight Lieutenant":
                return "Knight Lieutenant";
            case "Knight":
                return "Knight";
            case "Sergeant First Class":
                return "Sergeant First Class";
            case "Sergeant":
                return "Sergeant";
            case "Squire":
                return "Squire";
            case "Companion at Arms":
                return "Companion at Arms";
            default:
                console.log(`${name} is not a recognised group, defaulting to Guest`);
                return "Guest";
        }
    }

}
