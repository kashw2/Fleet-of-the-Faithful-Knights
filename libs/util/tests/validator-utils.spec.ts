import {validateMaxLength} from "../src/validator-utils";
import {Left, Right} from "funfix-core";

describe('Validator Utils', () => {
    it('should validate max length', () => {
        const result = validateMaxLength(`This string shouldn't be more than 5 characters long`, 5);
        expect(result).toEqual(Left('String is over max length'));
    });
    it('should validate min length', () => {
        const result = validateMaxLength(`This this string shouldn't be over 100 characters long`, 100);
        expect(result).toEqual(Right(`This this string shouldn't be over 100 characters long`));
    });
});