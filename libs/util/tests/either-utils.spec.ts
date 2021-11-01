import {EitherUtils} from "../src";
import {Left, None, Option, Right, Some} from "funfix-core";

describe('Option Utils', () => {
    it('should flatMap2 succeed', () => {
        const result = EitherUtils.flatMap2(
            Right(1),
            Right(2),
            (a, b) => Right(a + b));
        expect(result).toEqual(Right(3));
    });
    it('should flatMap2 fail', () => {
        const result = EitherUtils.flatMap2(
            Right(1),
            Left('Error'),
            (a, b) => Right(a + b));
        expect(result).toEqual(Left('Error'));
    });
    it('should flatMap3 succeed', () => {
        const result = EitherUtils.flatMap3(
            Right(1),
            Right(2),
            Right(3),
            (a, b, c) => Right(a + b + c));
        expect(result).toEqual(Right(6));
    });
    it('should flatMap3 fail', () => {
        const result = EitherUtils.flatMap3(
            Right(1),
            Right(2),
            Left('Error'),
            (a, b, c) => Right(a + b + c));
        expect(result).toEqual(Left('Error'));
    });
    it('should leftMap', () => {
        const result = EitherUtils.leftMap(
            Left('Error'),
            (v: string) => v + 'Test');
        expect(result).toEqual(Left('ErrorTest'));
    });
    it('should leftTap', () => {
        let result;
        EitherUtils.leftTap(
            Left('Error'),
            (v: string) => result = v + 'Test');
        expect(result).toEqual('ErrorTest');
    });
    it('should lift', () => {
        const result = EitherUtils.liftEither(1, 'Error');
        expect(result).toEqual(Right(1));
    });
    it('should sequence', () => {
        const result = EitherUtils.sequence(EitherUtils.liftEither(Promise.resolve(Right(1)), 'Error'));
        result.then(v => expect(v).toEqual(Right(1)));
    });
    it('should convert to either', () => {
        const result = EitherUtils.toEither(Option.of(1), 'Error');
        expect(result).toEqual(Right(1));
    });
});