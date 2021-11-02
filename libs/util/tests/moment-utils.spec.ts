import {MomentUtils} from "@kashw2/lib-util";
import moment from "moment";
import {Some} from "funfix-core";

describe('Moment Utils', () => {
    it('should format', () => {
        const result = MomentUtils.format(Some(moment('22 Jan 2021')), 'DMY');
        expect(result).toEqual(Some('22/01/2021'));
    });
});