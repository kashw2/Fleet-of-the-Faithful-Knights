import {Collection, List, Set} from 'immutable';
import {Either, Left, None, Option, Right} from 'funfix-core';
import {Future} from "funfix";

export class OptionUtils {

  static exists2<A, B>(o1: Option<A>, o2: Option<B>, f: (oa: A, ob: B) => boolean): boolean {
    if (o1.nonEmpty() && o2.nonEmpty()) {
      return f(o1.get(), o2.get());
    }
    return false;
  }

  /**
   * Flatten any datatype that extends/inherits a Functor that in itself isn't a HKT
   * but is a derived HKT
   */
  static flattenCollection<T>(collection: Collection<any, Option<T>>): Collection<any, T> {
    return collection.filter(v => v.nonEmpty())
      .map(v => v.get());
  }

  static flattenList<T>(list: List<Option<T>>): List<T> {
    return list.filter(v => v.nonEmpty())
      .map(v => v.get());
  }

  static flattenSet<T>(set: Set<Option<T>>): Set<T> {
    return set.filter(v => v.nonEmpty())
      .map(v => v.get());
  }

  static sequence<A>(op: Option<Promise<Option<A>>>): Promise<Option<A>> {
    return op.isEmpty() ? Promise.resolve(None) : op.get();
  }

  static sequenceFuture<A>(of: Option<Future<Option<A>>>): Future<Option<A>> {
    return of.isEmpty() ? Future.raise(None) : of.get();
  }

  /**
   * Idempotent function that allows us to execute an effect while returning the current state of the object being applied
   */
  static tap<A>(option: Option<A>, thunk: () => void): Option<A> {
    thunk();
    return option;
  }

  /**
   * Functionally equivalent to the combination of scala.Option.toRight and scala.Option.toLeft however does not have a left or right association
   */
  static toEither<T>(opt: Option<T>, left: string): Either<string, T> {
    if (opt.nonEmpty()) {
      return Right(opt.get());
    }
    return Left(left);
  }

  static toList<T>(...items: Option<T>[]): List<T> {
    return OptionUtils.flattenCollection(List.of(...items))
      .toList();
  }

  static toSet<T>(...items: Option<T>[]): Set<T> {
    return OptionUtils.flattenCollection(Set<Option<T>>(items))
      .toSet();
  }

  static when<A>(predicate: boolean, f: () => A): Option<A> {
    return predicate ? Option.of(f()) : None;
  }
}
