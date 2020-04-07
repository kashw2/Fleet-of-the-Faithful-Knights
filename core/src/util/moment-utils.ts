import * as moment from "moment";

export class MomentUtils {

    static formatString(s: string): string {
        return moment(s)
            .format("D/M/YY");
    }

}
