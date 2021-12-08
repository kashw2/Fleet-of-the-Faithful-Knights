import moment from "moment";
import {Some} from "funfix-core";
import {MomentUtils} from "../src";

describe('Moment Utils', () => {
    it('should format', () => {
        const result = MomentUtils.format(Some(moment('22 Jan 2021')), 'DMY');
        expect(result).toEqual(Some('22/01/2021'));
    });
});