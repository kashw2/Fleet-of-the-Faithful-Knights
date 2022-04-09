import test from "ava";
import {Left, Option, Right} from "funfix-core";
import { EitherUtils } from "../src";

test('OptionUtils should flatMap2 succeed', t=> {
    const result = EitherUtils.flatMap2(
        Right(1),
        Right(2),
        (a, b) => Right(a + b));
    t.deepEqual(result, Right(3));
});

test('OptionUtils should flatMap2 fail', t => {
    const result = EitherUtils.flatMap2(
        Right(1),
        Left('Error'),
        (a, b) => Right(a + b));
    t.deepEqual(result, Left('Error'));
});

test('OptionUtils should flatMap3 succeed', t => {
    const result = EitherUtils.flatMap3(
        Right(1),
        Right(2),
        Right(3),
        (a, b, c) => Right(a + b + c));
    t.deepEqual(result, Right(6));
});

test('OptionUtils should flatMap3 fail', t => {
    const result = EitherUtils.flatMap3(
        Right(1),
        Right(2),
        Left('Error'),
        (a, b, c) => Right(a + b + c));
    t.deepEqual(result, Left('Error'));
});

test('OptionUtils should leftMap', t => {
    const result = EitherUtils.leftMap(
        Left('Error'),
        (v: string) => v + 'Test');
    t.deepEqual(result, Left('ErrorTest'));
});

test('OptionUtils should leftTap', t => {
    let result;
    EitherUtils.leftTap(
        Left('Error'),
        (v: string) => result = v + 'Test');
    t.deepEqual(result, 'ErrorTest');
});

test('OptionUtils should lift', t => {
    const result = EitherUtils.liftEither(1, 'Error');
    t.deepEqual(result, Right(1));
});

test('OptionUtils should sequence', async t => {
    const result = await EitherUtils.sequence(EitherUtils.liftEither(Promise.resolve(Right(1)), 'Error'));
    t.deepEqual(result, Right(1));
});

test('OptionUtils should convert to either', t => {
    const result = EitherUtils.toEither(Option.of(1), 'Error');
    t.deepEqual(result, Right(1));
});