import {Either, Left, Option, Right} from "funfix-core";
import {EitherUtils} from "../src";
import {List} from "immutable";
import {Future} from "funfix";
import {describe, test} from 'vitest';

describe('EitherUtils', () => {
  test('EitherUtils should flatMap2 succeed', t => {
    const result = EitherUtils.flatMap2(
      Right(1),
      Right(2),
      (a, b) => Right(a + b));
    t.expect(result).toEqual(Right(3));
  });

  test('EitherUtils should flatMap2 fail', t => {
    const result = EitherUtils.flatMap2(
      Right(1),
      Left('Error'),
      (a, b) => Right(a + b));
    t.expect(result).toEqual(Left('Error'));
  });

  test('EitherUtils should flatMap3 succeed', t => {
    const result = EitherUtils.flatMap3(
      Right(1),
      Right(2),
      Right(3),
      (a, b, c) => Right(a + b + c));
    t.expect(result).toEqual(Right(6));
  });

  test('EitherUtils should flatMap4 succeed', t => {
    const result = EitherUtils.flatMap4(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      (a, b, c, d) => Right(a + b + c + d));
    t.expect(result).toEqual(Right(10));
  });

  test('EitherUtils should flatMap5 succeed', t => {
    const result = EitherUtils.flatMap5(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Right(5),
      (a, b, c, d, e) => Right(a + b + c + d + e));
    t.expect(result).toEqual(Right(15));
  });

  test('EitherUtils should flatMap6 succeed', t => {
    const result = EitherUtils.flatMap6(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Right(5),
      Right(6),
      (a, b, c, d, e, f) => Right(a + b + c + d + e + f));
    t.expect(result).toEqual(Right(21));
  });

  test('EitherUtils should flatMap7 succeed', t => {
    const result = EitherUtils.flatMap7(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Right(5),
      Right(6),
      Right(7),
      (a, b, c, d, e, f, g) => Right(a + b + c + d + e + f + g));
    t.expect(result).toEqual(Right(28));
  });

  test('EitherUtils should flatMap8 succeed', t => {
    const result = EitherUtils.flatMap8(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Right(5),
      Right(6),
      Right(7),
      Right(8),
      (a, b, c, d, e, f, g, h) => Right(a + b + c + d + e + f + g + h));
    t.expect(result).toEqual(Right(36));
  });

  test('EitherUtils should flatMap3 fail', t => {
    const result = EitherUtils.flatMap3(
      Right(1),
      Right(2),
      Left('Error'),
      (a, b, c) => Right(a + b + c));
    t.expect(result).toEqual(Left('Error'));
  });

  test('EitherUtils should flatMap4 fail', t => {
    const result = EitherUtils.flatMap4(
      Right(1),
      Right(2),
      Right(3),
      Left('Error'),
      (a, b, c, d) => Right(a + b + c + d));
    t.expect(result).toEqual(Left('Error'));
  });

  test('EitherUtils should flatMap5 fail', t => {
    const result = EitherUtils.flatMap5(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Left('Error'),
      (a, b, c, d, e) => Right(a + b + c + d + e));
    t.expect(result).toEqual(Left('Error'));
  });

  test('EitherUtils should flatMap6 fail', t => {
    const result = EitherUtils.flatMap6(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Right(5),
      Left('Error'),
      (a, b, c, d, e, f) => Right(a + b + c + d + e + f));
    t.expect(result).toEqual(Left('Error'));
  });

  test('EitherUtils should flatMap7 fail', t => {
    const result = EitherUtils.flatMap7(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Right(5),
      Right(6),
      Left('Error'),
      (a, b, c, d, e, f, g) => Right(a + b + c + d + e + f + g));
    t.expect(result).toEqual(Left('Error'));
  });

  test('EitherUtils should flatMap8 fail', t => {
    const result = EitherUtils.flatMap8(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Right(5),
      Right(6),
      Right(7),
      Left('Error'),
      (a, b, c, d, e, f, g, h) => Right(a + b + c + d + e + f + g + h));
    t.expect(result).toEqual(Left('Error'));
  });

  test('EitherUtils should map2 succeed', t => {
    const result = EitherUtils.map2(
      Right(1),
      Right(2),
      (a, b) => a + b);
    t.expect(result).toEqual(Right(3));
  });

  test('EitherUtils should map2 fail', t => {
    const result = EitherUtils.map2(
      Right(1),
      Left('Error'),
      (a, b) => a + b);
    t.expect(result).toEqual(Left('Error'));
  });

  test('EitherUtils should map3 succeed', t => {
    const result = EitherUtils.map3(
      Right(1),
      Right(2),
      Right(3),
      (a, b, c) => a + b + c);
    t.expect(result).toEqual(Right(6));
  });

  test('EitherUtils should map4 succeed', t => {
    const result = EitherUtils.map4(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      (a, b, c, d) => a + b + c + d);
    t.expect(result).toEqual(Right(10));
  });

  test('EitherUtils should map5 succeed', t => {
    const result = EitherUtils.map5(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Right(5),
      (a, b, c, d, e) => a + b + c + d + e);
    t.expect(result).toEqual(Right(15));
  });

  test('EitherUtils should map6 succeed', t => {
    const result = EitherUtils.map6(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Right(5),
      Right(6),
      (a, b, c, d, e, f) => a + b + c + d + e + f);
    t.expect(result).toEqual(Right(21));
  });

  test('EitherUtils should map7 succeed', t => {
    const result = EitherUtils.map7(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Right(5),
      Right(6),
      Right(7),
      (a, b, c, d, e, f, g) => a + b + c + d + e + f + g);
    t.expect(result).toEqual(Right(28));
  });

  test('EitherUtils should map8 succeed', t => {
    const result = EitherUtils.map8(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Right(5),
      Right(6),
      Right(7),
      Right(8),
      (a, b, c, d, e, f, g, h) => a + b + c + d + e + f + g + h);
    t.expect(result).toEqual(Right(36));
  });

  test('EitherUtils should map3 fail', t => {
    const result = EitherUtils.map3(
      Right(1),
      Right(2),
      Left('Error'),
      (a, b, c) => a + b + c);
    t.expect(result).toEqual(Left('Error'));
  });

  test('EitherUtils should map4 fail', t => {
    const result = EitherUtils.map4(
      Right(1),
      Right(2),
      Right(3),
      Left('Error'),
      (a, b, c, d) => a + b + c + d);
    t.expect(result).toEqual(Left('Error'));
  });

  test('EitherUtils should map5 fail', t => {
    const result = EitherUtils.map5(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Left('Error'),
      (a, b, c, d, e) => a + b + c + d + e);
    t.expect(result).toEqual(Left('Error'));
  });

  test('EitherUtils should map6 fail', t => {
    const result = EitherUtils.map6(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Right(5),
      Left('Error'),
      (a, b, c, d, e, f) => a + b + c + d + e + f);
    t.expect(result).toEqual(Left('Error'));
  });

  test('EitherUtils should map7 fail', t => {
    const result = EitherUtils.map7(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Right(5),
      Right(6),
      Left('Error'),
      (a, b, c, d, e, f, g) => a + b + c + d + e + f + g);
    t.expect(result).toEqual(Left('Error'));
  });

  test('EitherUtils should map8 fail', t => {
    const result = EitherUtils.map8(
      Right(1),
      Right(2),
      Right(3),
      Right(4),
      Right(5),
      Right(6),
      Right(7),
      Left('Error'),
      (a, b, c, d, e, f, g, h) => a + b + c + d + e + f + g + h);
    t.expect(result).toEqual(Left('Error'));
  });

  test('EitherUtils should leftMap', t => {
    const result = EitherUtils.leftMap(
      Left('Error'),
      (v: string) => v + 'Test');
    t.expect(result).toEqual(Left('ErrorTest'));
  });

  test('EitherUtils should leftTap', t => {
    let result;
    EitherUtils.leftTap(
      Left('Error'),
      (v: string) => result = v + 'Test');
    t.expect(result).toEqual('ErrorTest');
  });

  test('EitherUtils should lift', t => {
    const result = EitherUtils.lift(1, 'Error');
    t.expect(result).toEqual(Right(1));
  });

  test('EitherUtils should sequence', async t => {
    const result = await EitherUtils.sequence(EitherUtils.lift(Promise.resolve(Right(1)), 'Error'));
    t.expect(result).toEqual(Right(1));
  });

  test('EitherUtils should fail to sequence', async t => {
    const result = await EitherUtils.sequence(EitherUtils.lift(Promise.resolve(Left(1)), 'Error'));
    t.expect(result).toEqual(Left(1));
  });

  test('EitherUtils should convert to either', t => {
    const result = EitherUtils.toEither(Option.of(1), 'Error');
    t.expect(result).toEqual(Right(1));
  });

  test('EitherUtils should sequence future', async t => {
    const result = await EitherUtils.sequenceFuture(EitherUtils.lift(Future.pure(Right(1)), 'Error'));
    t.expect(result).toEqual(Right(1));
  });

  test('EitherUtils should fail to sequence future', async t => {
    const result = await EitherUtils.sequenceFuture(EitherUtils.lift(Future.pure(Left(1)), 'Error'));
    t.expect(result).toEqual(Left(1));
  });

  test('flattenCollection should naturally transform to collection', t => {
    const collection = List.of(Right(1));
    const result = EitherUtils.flattenCollection(collection).toArray();
    t.expect(result).toEqual([1]);
  });

  test('toList should transform varargs to list', t => {
    const result = EitherUtils.toList(Right(1), Right(2), Right(3)).toArray();
    t.expect(result).toEqual([1, 2, 3]);
  });

  test('toSet should transform varargs to set', t => {
    const result = EitherUtils.toSet(Right(1), Right(2), Right(3)).toArray();
    t.expect(result).toEqual([1, 2, 3]);
  });

  test('should show idempotency when tapping', async t => {
    await EitherUtils.tap(Either.pure("Hello World"), () => 1 + 1)
      .forEach(v => t.expect(v).toEqual('Hello World'));
  });
});
