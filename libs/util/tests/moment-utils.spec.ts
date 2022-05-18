import test from "ava";
import moment from "moment";
import {Some} from "funfix-core";
import {MomentUtils} from "../src";

test('MomentUtils should format', t => {
  const result = MomentUtils.format(Some(moment('22 Jan 2021')), 'DMY');
  t.deepEqual(result, Some('22/01/2021'));
});