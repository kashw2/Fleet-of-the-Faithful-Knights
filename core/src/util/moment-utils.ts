import * as moment from "moment";

export type FfkDateFormat = "DMY" | "DMYHM" | "12HT";

export class MomentUtils {

    static formatString(s: string, format: FfkDateFormat): string {
        // @ts-ignore
        return moment(s)
            .format(this.getFfkDateFormatString(format));
    }

    static getFfkDateFormatString(format: FfkDateFormat): string {
        switch (format) {
            case "DMY":
                return "D/M/YY";
            case "DMYHM":
                return "D/M/YY LT";
            // 12 Hour Time
            case "12HT":
                return "LT";
            default:
                console.info(`${format} is not a recognised FfkDateFormat, defaulting to DMY`);
                return "D/M/YY LT";
        }
    }

    static isSameDay(m: moment.Moment, comparator: moment.Moment): boolean {
        return m.isSame(comparator, "day");
    }

    static isSameMonth(m: moment.Moment, comparator: moment.Moment): boolean {
        return m.isSame(comparator, "month");
    }

    static isSameYear(m: moment.Moment, comparator: moment.Moment): boolean {
        return m.isSame(comparator, "year");
    }

}
