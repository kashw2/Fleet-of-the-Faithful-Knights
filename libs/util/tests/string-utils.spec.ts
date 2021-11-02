import {StringUtils} from "@kashw2/lib-util";

describe('String Utils', () => {
    it('should transform text to titlecase', () => {
        const result = StringUtils.toTitleCase('this is a test');
        expect(result).toBe('This Is A Test');
    });
});