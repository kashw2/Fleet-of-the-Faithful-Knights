import {StringUtils} from "../src";
import {describe, test} from "vitest";

describe('StringUtils', () => {
  test('StringUtils should transform text to titlecase', t => {
    const result = StringUtils.toTitleCase('hello world');
    t.expect(result).toEqual('Hello World');
  });

  test('StringUtils should transform text to titlecase using regex', t => {
    const result = StringUtils.toTitleCase('hello world', true);
    t.expect(result).toEqual('Hello World');
  });
});
