import test from "ava";
import {StringUtils} from "../src";

test('StringUtils should transform text to titlecase', t => {
  const result = StringUtils.toTitleCase('hello world');
  t.deepEqual(result, 'Hello World');
});

test('StringUtils should transform text to titlecase using regex', t => {
  const result = StringUtils.toTitleCase('hello world', true);
  t.deepEqual(result, 'Hello World');
});