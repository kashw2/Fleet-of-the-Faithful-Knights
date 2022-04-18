import test from "ava";
import {Left, Right} from "funfix-core";
import {validateMaxLength, validateString} from '../src/validator-utils';

test('validateMaxLength (string) should validate max length', t => {
    const result = validateMaxLength(`This string shouldn't be more than 5 characters long`, 5);
    t.deepEqual(result, Left('String is over max length'));
});

test('validateMaxLength (string) should validate min length', t => {
    const result = validateMaxLength(`This this string shouldn't be over 100 characters long`, 100);
    t.deepEqual(result, Right(`This this string shouldn't be over 100 characters long`));
});

test('validateMaxLength (number) should validate max length', t => {
    const result = validateMaxLength(123456, 5);
    t.deepEqual(result, Left('Number is over max length'));
});

test('validateMaxLength (number) should validate min length', t => {
    const result = validateMaxLength(1234, 100);
    t.deepEqual(result, Right('1234'));
});

test('validateMaxLength should hit default', t => {
    const result = validateMaxLength(true, 140);
    t.deepEqual(result, Left('Unknown type submitted for validation'));
});

test('validateString should validate', t => {
    const result = validateString('Hello World', v => v === 'Hello World');
    t.deepEqual(result, Right('Hello World'));
});