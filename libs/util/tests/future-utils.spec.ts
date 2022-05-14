import test from "ava";
import {FutureUtils} from "../src";
import {Future} from "funfix";

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