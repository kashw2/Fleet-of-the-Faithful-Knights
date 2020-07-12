import {List} from "immutable";

export class StringUtils {

    static toTitleCase(str: string, regExMatch: boolean = false): string {
        if (regExMatch) {
            return str.replace(/(^\w|\s\w)/g, match => match.toUpperCase());
        }
        const strings = List(str.toLowerCase().split(" "));
        return strings.map(s => s.charAt(0).toUpperCase().concat(s.substring(1)))
            .join(" ");
    }

}
