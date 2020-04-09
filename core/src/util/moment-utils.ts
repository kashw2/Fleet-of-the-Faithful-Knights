import * as moment from "moment";

export type FfkDateFormat = "DMY" | "DMYHM";

export class MomentUtils {

    static formatString(s: string, format: FfkDateFormat): string {
        return moment(s)
            .format(this.getFfkDateFormatString(format));
    }

    static getFfkDateFormatString(format: FfkDateFormat): string {
        switch (format) {
            case "DMY":
                return "D/M/YY";
            case "DMYHM":
                return "D/M/YY LT";
            default:
                console.info(`${format} is not a recognised FfkDateFormat, defaulting to DMY`);
                return "D/M/YY LT";
        }
    }

}
