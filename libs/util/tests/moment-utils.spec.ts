import moment from "moment";
import {Some} from "funfix-core";
import {MomentUtils} from "../src";
import {describe, test} from "vitest";

describe('MomentUtils', () => {
  test('MomentUtils should format', t => {
    const result = MomentUtils.format(Some(moment('22 Jan 2021')), 'DMY');
    t.expect(result).toEqual(Some('22/01/2021'));
  });
});
