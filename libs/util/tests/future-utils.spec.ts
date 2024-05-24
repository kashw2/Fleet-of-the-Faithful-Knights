import {FutureUtils} from "../src";
import {Future} from "funfix";
import {Left, None, Right, Some} from "funfix-core";
import {describe, test} from "vitest";

describe('FutureUtils', () => {
  test('should zip two futures', async t => {
    const result: number = await FutureUtils.zip(Future.pure(1), Future.pure(2))
      .map(([a, b]) => a + b);
    t.expect(result).toEqual(3);
  });

  test('should fail to zip two futures', async t => {
    await FutureUtils.zip(Future.raise("Error"), Future.pure(2))
      .map(([a, b]) => a + b)
      .toPromise()
      .then(_ => {
        throw new Error("This should fail");
      })
      .catch(v => t.expect(v).toEqual("Error"));
  });

  test('should zip two futures with a given function', async t => {
    const result: [number, number] = await FutureUtils.zipWith(Future.pure(1), Future.pure(2), (a, b) => [a, b]);
    t.expect(result).toEqual([1, 2]);
  });

  test('should fail to zip two futures with a given function', async t => {
    await FutureUtils.zipWith(Future.raise("Error"), Future.pure(2), (a, b) => [a, b])
      .toPromise()
      .then(_ => {
        throw new Error("This should fail");
      })
      .catch(v => t.expect(v).toEqual("Error"));
  });

  test('should convert a right to a pure future', async t => {
    const result = await FutureUtils.fromEither(Right(true));
    t.expect(result).toEqual(true);
  });

  test('should convert a left to a future and raise an error', async t => {
    await FutureUtils.fromEither(Left('Error'))
      .recover(v => {
        t.expect(v).toEqual('Error');
        return v;
      });
  });

  test('should convert a some to a pure future', async t => {
    const result = await FutureUtils.fromOption(Some(true), 'Error');
    t.expect(result).toEqual(true);
  });

  test('should convert a none to a future and raise an error', async t => {
    await FutureUtils.fromOption(None, 'Error')
      .recover(v => {
        t.expect(v).toEqual('Error');
        return v;
      });
  });

  test('should show idempotency when tapping', async t => {
    await FutureUtils.tap(Future.pure("Hello World"), () => 1 + 1)
      .forEach(v => t.expect(v).toEqual('Hello World'));
  });
});
