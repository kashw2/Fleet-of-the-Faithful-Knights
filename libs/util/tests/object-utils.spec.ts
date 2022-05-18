import test from "ava";
import {parseBoolean, parseNumber, parseString} from "../src";
import {None, Some} from "funfix-core";

test('parseString should succeed with a string>', t => {
  const result = parseString('Hello World');
  t.deepEqual(result, Some('Hello World'));
});

test('parseString should succeed with a number', t => {
  const result = parseString(1);
  t.deepEqual(result, Some('1'));
});

test('parseString should succeed with a boolean', t => {
  const result = parseString(true);
  t.deepEqual(result, Some('true'));
});

test('parseString should fail with a default', t => {
  const result = parseString(new Date());
  t.deepEqual(result, None);
});

test('parseNumber should succeed with a string', t => {
  const result = parseNumber('1');
  t.deepEqual(result, Some(1));
});

test('parseNumber should succeed with a number', t => {
  const result = parseNumber(1);
  t.deepEqual(result, Some(1));
});

test('parseNumber should succeed with a boolean', t => {
  const result = parseNumber(true);
  t.deepEqual(result, Some(1));
});

test('parseNumber should fail with a default', t => {
  const result = parseNumber(new Date());
  t.deepEqual(result, None);
});

test('parseBoolean should succeed with number', t => {
  const result = parseBoolean(1);
  t.deepEqual(result, Some(true));
});

test('parseBoolean should succeed with boolean', t => {
  const result = parseBoolean(true);
  t.deepEqual(result, Some(true));
});

test('parseBoolean should succeed with string', t => {
  const result = parseBoolean('true');
  t.deepEqual(result, Some(true));
});

test('parseBoolean should fail with default', t => {
  const result = parseBoolean(new Date());
  t.deepEqual(result, None);
});