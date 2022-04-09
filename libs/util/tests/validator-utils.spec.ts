import test from "ava";
import {Left, Right} from "funfix-core";
import {validateMaxLength} from '../src/validator-utils';

test('validateMaxLength should validate max length', t => {
    const result = validateMaxLength(`This string shouldn't be more than 5 characters long`, 5);
    t.deepEqual(result, Left('String is over max length'));
});

test('validateMaxLength should validate min length', t => {
    const result = validateMaxLength(`This this string shouldn't be over 100 characters long`, 100);
    t.deepEqual(result, Right(`This this string shouldn't be over 100 characters long`));
});