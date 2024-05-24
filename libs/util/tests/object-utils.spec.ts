import {parseBoolean, parseNumber, parseString} from "../src";
import {None, Some} from "funfix-core";
import {describe, test} from "vitest";

describe('ObjectUtils', () => {
  test('parseString should succeed with a string>', t => {
    const result = parseString('Hello World');
    t.expect(result).toEqual(Some('Hello World'));
  });

  test('parseString should succeed with a number', t => {
    const result = parseString(1);
    t.expect(result).toEqual(Some('1'));
  });

  test('parseString should succeed with a boolean', t => {
    const result = parseString(true);
    t.expect(result).toEqual(Some('true'));
  });

  test('parseString should fail with a default', t => {
    const result = parseString(new Date());
    t.expect(result).toEqual(None);
  });

  test('parseNumber should succeed with a string', t => {
    const result = parseNumber('1');
    t.expect(result).toEqual(Some(1));
  });

  test('parseNumber should succeed with a number', t => {
    const result = parseNumber(1);
    t.expect(result).toEqual(Some(1));
  });

  test('parseNumber should succeed with a boolean', t => {
    const result = parseNumber(true);
    t.expect(result).toEqual(Some(1));
  });

  test('parseNumber should fail with a default', t => {
    const result = parseNumber(new Date());
    t.expect(result).toEqual(None);
  });

  test('parseBoolean should succeed with number', t => {
    const result = parseBoolean(1);
    t.expect(result).toEqual(Some(true));
  });

  test('parseBoolean should succeed with boolean', t => {
    const result = parseBoolean(true);
    t.expect(result).toEqual(Some(true));
  });

  test('parseBoolean should succeed with string', t => {
    const result = parseBoolean('true');
    t.expect(result).toEqual(Some(true));
  });

  test('parseBoolean should fail with default', t => {
    const result = parseBoolean(new Date());
    t.expect(result).toEqual(None);
  });
});
