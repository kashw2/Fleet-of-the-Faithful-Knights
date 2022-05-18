import test from "ava";
import {CollectionUtils} from "../src";
import {List} from "immutable";
import {Some} from "funfix-core";

test('CollectionUtils should build a Map from a Collection', t => {
  const result = CollectionUtils.buildKeyedMap(List.of('H', 'e', 'l', 'l', 'o'), v => Some(v.toUpperCase())).toArray();
  t.deepEqual(result, [['H', 'H'], ['E', 'e'], ['L', 'l'], ['O', 'o']]);
})

test('CollectionUtils should convert each item to an Option', t => {
  const result = CollectionUtils.optionify(List.of('H', 'e', 'l', 'l', 'o')).toArray();
  t.deepEqual(result, [Some('H'), Some('e'), Some('l'), Some('l'), Some('o')])
})