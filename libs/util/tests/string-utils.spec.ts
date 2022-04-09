import test from "ava";
import {StringUtils} from "../src";

test('StringUtils should transform text to titlecase', t => {
    const result = StringUtils.toTitleCase('hello world');
    t.deepEqual(result, 'Hello World');
});