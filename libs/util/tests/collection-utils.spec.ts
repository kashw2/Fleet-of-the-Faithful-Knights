import {CollectionUtils} from "../src";
import {List} from "immutable";
import {Some} from "funfix-core";
import {describe, test} from 'vitest';

describe('CollectionUtils', () => {
  test('CollectionUtils should build a Map from a Collection', t => {
    const result = CollectionUtils.buildKeyedMap(List.of('H', 'e', 'l', 'l', 'o'), v => Some(v.toUpperCase())).toArray();
    t.expect(result).toEqual([['H', 'H'], ['E', 'e'], ['L', 'l'], ['O', 'o']]);
  });

  test('CollectionUtils should convert each item to an Option', t => {
    const result = CollectionUtils.optionify(List.of('H', 'e', 'l', 'l', 'o')).toArray();
    t.expect(result).toEqual([Some('H'), Some('e'), Some('l'), Some('l'), Some('o')]);
  });
});
