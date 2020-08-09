import {Option} from "funfix-core";
import {Map, Set} from "immutable";
import { Enum } from "../models/enum";
import { Group } from "../misc/type-defs";

export const DiscordGroupIdMap: Map<string, string> = Map({
    "541835139701800962": "Grand Master",
    "541834583268917248": "Master Commander",
    "698756805177901076": "Developer",
    "539194625056047106": "Knight Commander",
    // ..
    // "631948957664280586": "Developer",
    "541834732376424448": "Knight Lieutenant",
    // .
    // "549080433900650536": "Developer",
    "541839842435137577": "Knight",
    "539194544575741993": "Sergeant First Class",
    "541835663373369344": "Sergeant",
    "539194387674955776": "Companion at Arms",
    "539194424001953793": "Squire",
});

export const GroupMapByName: Map<string, number> = Map({
    "Developer": 1,
    "Grand Master": 2,
    "Master Commander": 3,
    "Developer (Unverified)": 12,
    "Knight Commander": 4,
    "Knight Lieutenant": 5,
    "Knight": 6,
    "Sergeant First Class": 7,
    "Sergeant": 8,
    "Squire": 9,
    "Companion at Arms": 10,
    "Guest": 11,
});

export const GroupMapByRanking: Map<string, number> = Map({
    "Developer": 12,
    "Grand Master": 11,
    "Master Commander": 10,
    "Knight Commander": 9,
    "Knight Lieutenant": 8,
    "Knight": 7,
    "Sergeant First Class": 6,
    "Sergeant": 5,
    "Companion at Arms": 4,
    "Squire": 3,
    "Guest": 2,
    "Developer (Unverified)": 1,
})

export class GroupUtils {

    static containsNonGuestRoles(ids: Set<string>): boolean {
        return ids.some(id => {
            switch (id) {
                case "541835139701800962":
                case "541834583268917248":
                case "698756805177901076":
                case "539194625056047106":
                // ..
                // case "631948957664280586":
                case "541834732376424448":
                // .
                // case "549080433900650536":
                case "541839842435137577":
                case "539194544575741993":
                case "541835663373369344":
                case "539194387674955776":
                case "539194424001953793":
                    return true;
                default:
                    return false;
            }
        });
    }

    static getGroupIdFromName(name: Group): number {
        switch (name) {
            case "Developer":
                return 1;
            case "Developer (Unverified)":
                return 12;
            case "Grand Master":
                return 2;
            case "Master Commander":
                return 3;
            case "Knight Commander":
                return 4;
            case "Knight Lieutenant":
                return 5;
            case "Knight":
                return 6;
            case "Sergeant First Class":
                return 7;
            case "Sergeant":
                return 8;
            case "Companion at Arms":
                return 9;
            case "Squire":
                return 10;
            case "Guest":
                return 11;
            default:
                console.log(`${name} is not a recognised group, defaulting to Guest`);
                return 11;
        }
    }

    static getGroupNameFromDiscordRoleId(role: string): Group {
        switch (role) {
            case "541835139701800962":
                return "Grand Master";
            case "541834583268917248":
                return "Master Commander";
            case "698756805177901076":
                return "Developer (Unverified)";
            case "539194625056047106":
                return "Knight Commander";
            // ..
            // case "631948957664280586":
            //     return "Developer";
            case "541834732376424448":
                return "Knight Lieutenant";
            // .
            // case "549080433900650536":
            //     return "Developer";
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
                console.log(`${role} is not a recognised discord role, defaulting to Guest`);
                return "Guest";
        }
    }

    static isGroupHigher(group: string, comparator: string): boolean {
        // @ts-ignore
        return GroupMapByRanking.get(group) >= GroupMapByRanking.get(comparator);
    }

    static isGroupLower(group: string, comparator: string): boolean {
        // @ts-ignore
        return GroupMapByRanking.get(group) < GroupMapByRanking.get(comparator);
    }

    static isInRoleHierarchy(role: string, method: "DISCORD" | "NAME" = "DISCORD"): boolean {
        switch (method) {
            case "DISCORD":
                switch (this.getGroupNameFromDiscordRoleId(role)) {
                    case "Developer":
                    case "Developer (Unverified)":
                    case "Grand Master":
                    case "Master Commander":
                    case "Knight Commander":
                    case "Knight Lieutenant":
                    case "Knight":
                    case "Sergeant First Class":
                    case "Sergeant":
                    case "Companion at Arms":
                    case "Squire":
                        return true;
                    default:
                        return false;
                }
            case "NAME":
                switch (role as Group) {
                    case "Developer":
                    case "Developer (Unverified)":
                    case "Grand Master":
                    case "Master Commander":
                    case "Knight Commander":
                    case "Knight Lieutenant":
                    case "Knight":
                    case "Sergeant First Class":
                    case "Sergeant":
                    case "Companion at Arms":
                    case "Squire":
                        return true;
                    default:
                        return false;
                }
            default:
                throw new Error(`Unsupported method '${method}'`);
        }
    }

    static parseGroup(name: string): Group {
        switch (name) {
            case "Developer":
                return "Developer (Unverified)";
            case "Developer (Unverified)":
                return "Developer (Unverified)";
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
            case "Companion at Arms":
                return "Companion at Arms";
            case "Squire":
                return "Squire";
            default:
                console.log(`${name} is not a recognised group, defaulting to Guest`);
                return "Guest";
        }
    }

    static parseGroupOption(name: string): Option<Group> {
        return Option.of(this.parseGroup(name));
    }

    static sortGroupEnumsHierarchy(groups: Set<Enum>): Set<Enum> {
        return groups.sort((now, previous) => {
           return Option.map2(now.getValue(), previous.getValue(), (v1, v2) => {
               if (GroupUtils.isGroupLower(v1, v2)) {
                   return 1;
               }
               if (GroupUtils.isGroupHigher(v1, v2)) {
                   return -1;
               }
               return 0;
           }).getOrElse(1);
        });
    }

    static sortGroupsHierarchy(groups: Set<string>): Set<string> {
        return groups.sort((now, previous) => {
            if (GroupUtils.isGroupLower(now, previous)) {
                return 1;
            }
            if (GroupUtils.isGroupHigher(now, previous)) {
                return -1;
            }
            return 0;
        });
    }

}
