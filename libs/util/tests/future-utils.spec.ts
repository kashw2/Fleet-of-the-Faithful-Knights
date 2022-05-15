import test from "ava";
import {FutureUtils} from "../src";
import {Future} from "funfix";
import {Left, None, Right, Some} from "funfix-core";

test('should zip two futures', async t => {
    const result: number = await FutureUtils.zip(Future.pure(1), Future.pure(2))
        .map(([a, b]) => a + b);
    t.is(result, 3);
});

test('should fail to zip two futures', async t => {
    await FutureUtils.zip(Future.raise("Error"), Future.pure(2))
        .map(([a, b]) => a + b)
        .toPromise()
        .then(_ => t.fail("This should fail"))
        .catch(v => t.deepEqual(v, "Error"));
});

test('should zip two futures with a given function', async t => {
    const result: [number, number] = await FutureUtils.zipWith(Future.pure(1), Future.pure(2), (a, b) => [a, b]);
    t.deepEqual(result, [1, 2]);
});

test('should fail to zip two futures with a given function', async t => {
    await FutureUtils.zipWith(Future.raise("Error"), Future.pure(2), (a, b) => [a, b])
        .toPromise()
        .then(_ => t.fail("This should fail"))
        .catch(v => t.deepEqual(v, "Error"));
});

test('should convert a right to a pure future', async t => {
    const result = await FutureUtils.fromEither(Right(true));
    t.deepEqual(result, true);
});

test('should convert a left to a future and raise an error', async t => {
    await FutureUtils.fromEither(Left('Error'))
        .recover(v => {
            t.deepEqual(v, 'Error');
            return v;
        });
});

test('should convert a some to a pure future', async t => {
    const result = await FutureUtils.fromOption(Some(true), 'Error');
    t.deepEqual(result, true);
});

test('should convert a none to a future and raise an error', async t => {
    await FutureUtils.fromOption(None, 'Error')
        .recover(v => {
            t.deepEqual(v, 'Error');
            return v;
        });
});